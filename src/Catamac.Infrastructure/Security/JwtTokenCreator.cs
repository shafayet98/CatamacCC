using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Catamac.Application.Interfaces;
using Catamac.Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;



namespace Catamac.Infrastructure.Security
{
    public class JwtTokenCreator: ITokenService
    {
        private readonly IConfiguration _config;

        public JwtTokenCreator(IConfiguration config)
        {
            _config = config;
        }

        public string CreateAccessToken(User user)
        { 
            var key = _config["Jwt:Key"]!;
            var issuer = _config["Jwt:Issuer"]!;
            var audience = _config["Jwt:Audience"]!;
            var expiresMinutes = int.Parse(_config["Jwt:ExpiresMinutes"] ?? "120");

            var claims = new List<Claim>
            {
               new(ClaimTypes.NameIdentifier, user.Id.ToString()),
               new(ClaimTypes.Email, user.Email),
               new(ClaimTypes.Name, user.Username)
            };

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var creds = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expiresMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
