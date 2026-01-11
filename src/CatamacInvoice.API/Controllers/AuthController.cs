using Catamac.Application.Dtos.Auth;
using Catamac.Application.Services;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace CatamacInvoice.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController: ControllerBase
    {
        public readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register([FromBody] AuthRegisterRequest req)
        {
            try
            {
                var user = await _authService.RegisterAsync(req);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login([FromBody] AuthLoginRequest req)
        {
            try
            { 
                var result = await _authService.LoginAsync(req);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

    }
}
