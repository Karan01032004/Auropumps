namespace Poweradmin.Server.DTOs
{
    public class ProductDTO
    {
        public string title { get; set; }

        public bool Visible { get; set; }
        public bool isFeatured { get; set; }
        public bool isaddcontact { get; set; }

        public string PageIETitle { get; set; }
        public string Meta { get; set; }

        public string technicalDetails { get; set; }
        public string description { get; set; }
        public string MOC { get; set; }
        public string applications { get; set; }

    }
}
