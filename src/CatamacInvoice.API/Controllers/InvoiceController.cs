using Catamac.Application.Services;
using Catamac.Application.Dtos.Invoices;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace CatamacInvoice.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class InvoiceController: ControllerBase
    {
        private readonly InvoiceService _invoiceService;
        public InvoiceController(InvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
        }

        [HttpGet]
        public async Task<ActionResult<List<InvoiceDto>>> GetAll()
        {
            var items = await _invoiceService.GetAllAsync();
            return Ok(items);
        }

        [HttpGet("{invoiceId}")]
        public async Task<ActionResult<InvoiceDetailsDto>> GetById([FromBody] int invoiceId)
        {
            try
            {
                var item = await _invoiceService.GetByIdAsync(invoiceId);
                return Ok(item);

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<InvoiceDto>> Create([FromBody] InvoiceCreateRequest req)
        {
            try
            {
                var createdInvoice = await _invoiceService.CreateAsync(req);
                return Ok(createdInvoice);

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });

            }

        }



    }
}
