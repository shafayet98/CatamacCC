using Catamac.Application.Dtos.Clients;
using Catamac.Application.Services;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;



namespace CatamacInvoice.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ClientController: ControllerBase
    {
        private readonly ClientService _clientService;
        public ClientController(ClientService clientService)
        {
            _clientService = clientService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ClientDto>>> GetAll()
        {
            var items = await _clientService.GetAllAsync();
            return Ok(items);
        }

        [HttpPost]
        public async Task<ActionResult<ClientDto>> Create([FromBody] ClientCreateRequest req)
        {
            try
            {
                var createdClient = await _clientService.CreateAsync(req);
                return Ok(createdClient);

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
