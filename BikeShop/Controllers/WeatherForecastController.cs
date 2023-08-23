using Azure.Storage.Blobs.Specialized;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Mvc;
using Nancy.Json;
using System.Text.Json;
using System.Text;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Specialized;
using System.Text.Json;
namespace BikeShop.Controllers
{
    [ApiController]
    [Route("weatherforecast")]
    public class WeatherForecastController : ControllerBase
    {


        [HttpGet]
        public async Task<Item[]> Get()
        {
            try
            {

                var service = new AzureBlobService();
                string jsonContent = await service.GetJsonFileContentsAsync("items.json");


                JavaScriptSerializer js = new JavaScriptSerializer();
                Item[] items = js.Deserialize<Item[]>(jsonContent);

                return items;

            }
            catch (Exception ex)
            {

                return null;
            }
        }

        [HttpGet("GetOrders")]
        public async Task<Order[]> GetOrders()
        {
            try
            {

                var service = new AzureBlobService();
                string jsonContent = await service.GetJsonFileContentsAsync("orders.json");


                JavaScriptSerializer js = new JavaScriptSerializer();
                Order[] orders = js.Deserialize<Order[]>(jsonContent);

                return orders;

            }
            catch (Exception ex)
            {

                return null;
            }
        }

        [HttpPost("DeleteItem")]
        public async void DeleteItem()
        {
            try
            {
                
                     int itemId =int.Parse( Request.Form["ItemId"] );
                string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "items.json");

                var service = new AzureBlobService();

                string jsonContent = await service.GetJsonFileContentsAsync("items.json");

                JavaScriptSerializer js = new JavaScriptSerializer();
                List<Item> items;
                items = js.Deserialize<List<Item>>(jsonContent);

                items.RemoveAll(item => item.id == itemId);
                string updatedJson = js.Serialize(items);

                System.IO.File.WriteAllText(filePath, updatedJson);

                //overwrite the file is azure
                await service.UploadFilesAsync("items.json");



            }
            catch (Exception ex)
            {

            }
        }



        [HttpPost("Login")]
        public IActionResult Login()
        {
            try
            {
                string username = Request.Form["username"];
                string password = Request.Form["password"];

                string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "Login.json");



                if (System.IO.File.Exists(filePath))
                {

                    string jsonContent = System.IO.File.ReadAllText(filePath);

                    JavaScriptSerializer js = new JavaScriptSerializer();
                    User user = js.Deserialize<User>(jsonContent);
                    if (username == user.username && password == user.password)
                    {
                        return Ok();
                    }
                    else
                    {
                        return NotFound("username or password incorrect");
                    }

                }
                return BadRequest("file doesnt exsist");

            }
            catch
            {

                return BadRequest();
            }
        }
        public static string ConvertImageToBase64(IFormFile image)
        {
            if (image == null || image.Length == 0)
            {
                return null;
            }

            using (MemoryStream memoryStream = new MemoryStream())
            {
                image.CopyTo(memoryStream);
                byte[] imageData = memoryStream.ToArray();
                return Convert.ToBase64String(imageData);
            }
        }

        [HttpPost("UploadItem2")]
        public async Task<IActionResult> UploadItem2()
        {
            try
            {
                string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "items.json");

                if (System.IO.File.Exists(filePath))
                {

                    //upload image


                    //   var image = Request.Form.Files["images"];


                    IFormFile image1 = Request.Form.Files["image1"];
                    IFormFile image2 = Request.Form.Files["image2"];
                    IFormFile image3 = Request.Form.Files["image3"];
                    IFormFile image4 = Request.Form.Files["image4"];
                    IFormFile image5 = Request.Form.Files["image5"];

                    var images = new List<IFormFile>();

                    if (image1 != null)
                    {
                        images.Add(image1);
                    }
                    if (image2 != null)
                    {
                        images.Add(image2);
                    }
                    if (image3 != null)
                    {
                        images.Add(image3);
                    }
                    if (image4 != null)
                    {
                        images.Add(image4);
                    }
                    if (image5 != null)
                    {
                        images.Add(image5);
                    }





                    List<string> images64 = new List<string>();
                    for (int i = 0; i < images.Count; i++)
                    {




                        images64.Add(ConvertImageToBase64(images[i]));
                    }
                    //upload item


                    var service = new AzureBlobService();
                    string jsonContent = await service.GetJsonFileContentsAsync("items.json"); //get the old file from azure
                    JavaScriptSerializer js = new JavaScriptSerializer();
                    List<Item> items;
                    items = js.Deserialize<List<Item>>(jsonContent);

                    int id;
                    if (items.Count == 0)
                    {
                        items = new List<Item>();
                        id = 0;
                    }
                    else
                    {
                        id = items[items.Count - 1].id + 1;
                    }


                    var name = Request.Form["name"];
                    var price = Request.Form["price"];
                    var description = Request.Form["description"];
                    var category = Request.Form["category"];

                    Item item = new Item();
                    item.name = name.ToString();
                    item.price = price.ToString();
                    item.description = description.ToString();
                    item.id = id;
                    item.category= category


                    item.images = (images64);
                    items.Add(item);
                    string updatedJson = js.Serialize(items);

                    System.IO.File.WriteAllText(filePath, updatedJson);

                    //overwrite the file is azure
                //    await service.UploadFilesAsync("items.json");


                    return Ok();

                }
                else
                {
                    Console.WriteLine("items file path could be found");
                    return StatusCode(500, new { error = "items file path couldnt be found" });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("unknown error  " + ex);
                return StatusCode(500, new { error = "unknown error" });
            }

        }


        [HttpPost("UploadOrder")]
        public async Task<IActionResult> UploadOrder()
        {
            try
            {
                string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "orders.json");

                if (System.IO.File.Exists(filePath))
                {



                    var service = new AzureBlobService();
                    string jsonContent = await service.GetJsonFileContentsAsync("orders.json"); //get the old file from azure
                    JavaScriptSerializer js = new JavaScriptSerializer();
                    List<Order> orders;
                    orders = js.Deserialize<List<Order>>(jsonContent);

                    int id;
                    if (orders == null)
                    {
                        orders = new List<Order>();
                        id = 0;
                    }
                    else
                    {
                        id = orders[orders.Count - 1].id + 1;
                    }


                    var phone = Request.Form["phone"];
                    var address = Request.Form["address"];

                    var items = Request.Form["cartItems"];


                    //    List<Item> itemsList = js.Deserialize<List<Item>>(items);
                    Item[] itemArray = js.Deserialize<Item[]>(items);


                    //add the new order

                    Order order = new Order();
                    order.phone = phone.ToString();
                    order.address = address.ToString();
                    order.items = itemArray;
                    order.id = id;

                    orders.Add(order);

                    string updatedJson = js.Serialize(orders);

                    System.IO.File.WriteAllText(filePath, updatedJson);

                    //overwrite the file is azure
                    await service.UploadFilesAsync("orders.json");


                    return Ok("good");

                }
                else
                {
                    Console.WriteLine("order file path could be found");
                    return StatusCode(500, new { error = "order file path couldnt be found" });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("unknown error  " + ex);
                return StatusCode(500, new { error = "unknown error" });
            }

        }






    }

}


