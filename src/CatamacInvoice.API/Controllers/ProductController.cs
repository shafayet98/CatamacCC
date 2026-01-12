using Catamac.Application.Dtos.Products;
using Catamac.Application.Services;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace CatamacInvoice.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;

        public ProductController(ProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductDto>>> GetAll()
        { 
            var products = await _productService.GetAllAsync();
            return Ok(products);
        }

        [HttpPost]
        public async Task<ActionResult<ProductDto>> Create([FromBody] ProductCreateRequest req)
        {
            try
            {
                var createdProduct = await _productService.CreateAsync(req);
                return Ok(createdProduct);
            }
            catch (Exception ex) {
                return BadRequest(new { message = ex.Message });
            }
        
        }
    }
}
