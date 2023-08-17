using Azure.Storage.Blobs.Specialized;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Mvc;
using Nancy.Json;
using System.Text.Json;
using System.Text;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Specialized;

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
                string jsonContent = await service.GetJsonFileContentsAsync("Data/items.json");


                    JavaScriptSerializer js = new JavaScriptSerializer();
                    Item[] items = js.Deserialize<Item[]>(jsonContent);

                    return items;

            }
            catch (Exception ex)
            {

                return null;
            }
        }
        [HttpPost("UploadItem")]
        public async Task<IActionResult> UploadItem()
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


                    // Define the path where you want to store the images

                    var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "Images");
                    if (!Directory.Exists(uploadPath))
                    {
                        Directory.CreateDirectory(uploadPath);
                    }
                    List<string> imagePaths = new List<string>();
                    for (int i = 0; i < images.Count; i++)
                    {
                        // Generate a unique file name
                        var uniqueFileName = Guid.NewGuid().ToString() + "_" + images[i].FileName;

                        // Combine the upload path with the unique file name
                        string path = Path.Combine(uploadPath, uniqueFileName);
                        imagePaths.Add(path);

                        // Save the image to the specified path
                        using (var fileStream = new FileStream(path, FileMode.Create))
                        {
                            await images[i].CopyToAsync(fileStream);
                        }
                    }
                    //upload item
                    string jsonContent = System.IO.File.ReadAllText(filePath);
                    JavaScriptSerializer js = new JavaScriptSerializer();
                    List<Item> items;
                    items = js.Deserialize<List<Item>>(jsonContent);

                    int id;
                    if (items == null)
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

                    Item item = new Item();
                    item.name = name.ToString();
                    item.price = price.ToString();
                    item.description = description.ToString();
                    item.id = id;

                    item.imagesPaths = new List<string>();
                    item.imagesPaths = (imagePaths);
                    items.Add(item);
                    string updatedJson = js.Serialize(items);

                    System.IO.File.WriteAllText(filePath, updatedJson);


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

        [HttpPost("UploadImage")]
        public async Task<IActionResult> UploadImage()
        {
            try
            {
                // Retrieve data from the FormData
                int id = int.Parse(Request.Form["id"]);
                var image = Request.Form.Files["image"];

                // Check if the image is present
                if (image == null || image.Length == 0)
                {
                    return BadRequest("No image uploaded.");
                }

                // Define the path where you want to store the image
                var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "Images");
                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }

                // Generate a unique file name
                var uniqueFileName = Guid.NewGuid().ToString() + "_" + image.FileName;

                // Combine the upload path with the unique file name
                var filePath = Path.Combine(uploadPath, uniqueFileName);

                // Save the image to the specified path
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(fileStream);
                }

                // Process the data as needed

                return Ok("Upload successful");
            }
            catch (Exception ex)
            {
                return BadRequest("An error occurred: " + ex.Message);
            }
        }

        [HttpPost("images")]
        public IActionResult images()
        {
            var imagePath = Request.Form["imagePath"];
            try
            {
                Console.WriteLine("path :" + imagePath);
                if (imagePath != "undefined")
                {
                    var imageBytes = System.IO.File.ReadAllBytes(imagePath);
                    Console.WriteLine("image" + imageBytes.Length);
                    return File(imageBytes, "image/jpeg"); // Adjust the content type as needed
                }
            }
            catch
            {
                return NotFound();
            }
            return BadRequest();
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


                    // Define the path where you want to store the images

                   
                    List<string> images64 = new List<string>(); 
                    for (int i = 0; i < images.Count; i++)
                    {



                        // Save the image to the specified path
                        images64.Add(ConvertImageToBase64(images[i]));
                    }
                    //upload item

                    // string jsonContent = System.IO.File.ReadAllText(filePath);
                     var service = new AzureBlobService();
                    string jsonContent = await service.GetJsonFileContentsAsync("Data/items.json"); //get the old file from azure
                    JavaScriptSerializer js = new JavaScriptSerializer();
                    List<Item> items;
                    items = js.Deserialize<List<Item>>(jsonContent);

                    int id;
                    if (items == null)
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

                    Item item = new Item();
                    item.name = name.ToString();
                    item.price = price.ToString();
                    item.description = description.ToString();
                    item.id = id;

                  
                    item.images = (images64);
                    items.Add(item);
                    string updatedJson = js.Serialize(items);

                    System.IO.File.WriteAllText(filePath, updatedJson);

                    //overwrite the file is azure
                  await  service.UploadFilesAsync();


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


       



    }

}


