
namespace BikeShop
{
    public class Item
    {
        public  int  id { get; set; }
        public string? name { get; set; }
        public string?  price { get; set; }
        public  string? description { get; set; }
        public List<string>? imagesPaths { get; set; }
        public List<string>? images { get; set; }
        public int? categoryId { get; set; }
    }
    public class User
    {
        public string username { get; set; }
        public  string  password { get; set; }
    }
    public class Key
    {
        public string connectionString { get; set; }
    }
    public class Category
    {
        public int id { get; set; }
        public string? name { get; set; }
        public string? imagePath { get; set; }

    }

}

