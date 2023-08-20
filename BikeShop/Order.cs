namespace BikeShop
{
    public class Order
    {
        public int id { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public Item[] items { get; set; }


    }
}
