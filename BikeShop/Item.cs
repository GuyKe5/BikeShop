
namespace BikeShop
{
    public class Item
    {
        public  int  id { get; set; }
        public string name { get; set; }
        public double  price { get; set; }
        public  string? description { get; set; }
        public List<string>? imagesPaths { get; set; } 
    }
}
