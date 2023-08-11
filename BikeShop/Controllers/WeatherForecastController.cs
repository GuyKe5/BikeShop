using Microsoft.AspNetCore.Mvc;
using Nancy.Json;

namespace BikeShop.Controllers
{
    [ApiController]
    [Route("weatherforecast")]
    public class WeatherForecastController : ControllerBase
    {
      

        [HttpGet]
        public Item[] Get()
        {
            try
            {

                string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "items.json");
                Console.WriteLine($"File Path: {filePath}");


                if (System.IO.File.Exists(filePath))
                {
                    string jsonContent = System.IO.File.ReadAllText(filePath);
                    Console.WriteLine(jsonContent);
                    JavaScriptSerializer js = new JavaScriptSerializer();
                    Item[] items = js.Deserialize<Item[]>(jsonContent);

                    return items;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {

                return null;
            }
        }
    }
}