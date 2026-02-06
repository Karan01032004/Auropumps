using Microsoft.AspNetCore.Mvc;
using Poweradmin.Server.Data;
using Poweradmin.Server.DTOs;
using Poweradmin.Server.Models;

namespace Poweradmin.Server.Controllers
{
    [Route("api/product")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _db;

        public ProductController(AppDbContext db)
        {
            _db = db;
        }

        // =========================
        // ✅ ADD PRODUCT
        // =========================
        [HttpPost("add")]
        public IActionResult Add(
            [FromForm] ProductDTO dto,
            IFormFile image1,
            IFormFile image2,
            IFormFile image3,
            IFormFile catalogue
        )
        {
            try
            {
                string image1Path = image1 != null ? SaveFile(image1, "products") : null;
                string image2Path = image2 != null ? SaveFile(image2, "products") : null;
                string image3Path = image3 != null ? SaveFile(image3, "products") : null;
                string cataloguePath = catalogue != null ? SaveFile(catalogue, "catalogue") : null;

                //int maxOrder = _db.Product
                //    .Select(x => (int?)x.sortorder)
                //    .DefaultIfEmpty(0)
                //    .Max() ?? 0;
                int maxOrder = _db.Product.Max(x => (int?)x.sortorder) ?? 0;
                var product = new Product
                {
                    title = dto.title,

                    image1 = image1Path,
                    image2 = image2Path,
                    image3 = image3Path,
                    catelogue = cataloguePath,

                    technicalDetails = dto.technicalDetails,
                    description = dto.description,
                    MOC = dto.MOC,
                    applications = dto.applications,

                    Visible = dto.Visible,
                    isFeatured = dto.isFeatured,
                    isaddcontact = dto.isaddcontact,

                    PageIETitle = dto.PageIETitle,
                    Meta = dto.Meta,

                    sortorder = maxOrder + 1,
                    addedDate = DateTime.Now,
                    addedIp = HttpContext.Connection.RemoteIpAddress?.ToString()
                };

                _db.Product.Add(product);
                _db.SaveChanges();

                return Ok(new { message = "Product added successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // =========================
        // ✅ UPDATE PRODUCT
        // =========================
        [HttpPut("update/{id}")]
        public IActionResult Update(
            int id,
            [FromForm] ProductDTO dto,
            IFormFile image1,
            IFormFile image2,
            IFormFile image3,
            IFormFile catalogue
        )
        {
            var product = _db.Product.FirstOrDefault(x => x.id == id);
            if (product == null)
                return NotFound(new { message = "Product not found" });

            if (image1 != null)
                product.image1 = SaveFile(image1, "products");

            if (image2 != null)
                product.image2 = SaveFile(image2, "products");

            if (image3 != null)
                product.image3 = SaveFile(image3, "products");

            if (catalogue != null)
                product.catelogue = SaveFile(catalogue, "catalogue");

            product.title = dto.title;
            product.technicalDetails = dto.technicalDetails;
            product.description = dto.description;
            product.MOC = dto.MOC;
            product.applications = dto.applications;

            product.Visible = dto.Visible;
            product.isFeatured = dto.isFeatured;
            product.isaddcontact = dto.isaddcontact;

            product.PageIETitle = dto.PageIETitle;
            product.Meta = dto.Meta;

            product.modifyDate = DateTime.Now;
            product.modifyIp = HttpContext.Connection.RemoteIpAddress?.ToString();

            _db.SaveChanges();

            return Ok(new { message = "Product updated successfully" });
        }

        // =========================
        // ✅ DELETE PRODUCT
        // =========================
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            var product = _db.Product.FirstOrDefault(x => x.id == id);
            if (product == null)
                return NotFound(new { message = "Product not found" });

            _db.Product.Remove(product);
            _db.SaveChanges();

            return Ok(new { message = "Product deleted successfully" });
        }

        // =========================
        // 🔧 FILE SAVE HELPER
        // =========================
        private string SaveFile(IFormFile file, string folder)
        {
            var uploadPath = Path.Combine(
                Directory.GetCurrentDirectory(),
                "wwwroot",
                "Webfiles",
                folder
            );

            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            return $"/Webfiles/{folder}/{fileName}";
        }
    }
}
