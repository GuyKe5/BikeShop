using System;
using System.IO; // Add this using directive for file operations
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Nancy.Json;

namespace BikeShop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly ILogger<ItemsController> _logger;

        public ItemsController(ILogger<ItemsController> logger)
        {
            _logger = logger;
        }

        [HttpGet("getit")]
        public IActionResult Get()
        {
            try
            {
                
                string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "items.json");
                Console.WriteLine($"File Path: {filePath}");


                if (System.IO.File.Exists(filePath))
                {
                    string jsonContent = System.IO.File.ReadAllText(filePath);
                    Console.WriteLine(  jsonContent);
                    JavaScriptSerializer js = new JavaScriptSerializer();
                    Item[] items = js.Deserialize<Item[]>(jsonContent);
                    IActionResult r = Ok(items);
                    return Ok(r);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error reading data from file");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
