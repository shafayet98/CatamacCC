using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Catamac.Application.Interfaces;
using Catamac.Domain.Entities;
using Catamac.Application.Dtos.Auth;

namespace Catamac.Application.Services
{
    public class AuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher _passwordHasher;
        private readonly ITokenService _tokenService;

        public AuthService(IUserRepository userReporsitory, IPasswordHasher passwordHasher, ITokenService tokenService) { 
            _userRepository = userReporsitory;
            _passwordHasher = passwordHasher;
            _tokenService = tokenService;
        }

        public async Task<UserDto> RegisterAsync(AuthRegisterRequest req) {
            var email = req.Email.ToLowerInvariant();
            if (await _userRepository.EmailExistsAsync(email)){
                throw new Exception("Email Already Exists");
            }

            var user = new User {
                Username = req.Username.Trim(),
                Email = email,
                PasswordHashed = _passwordHasher.Hash(req.Password),
            };

            await _userRepository.AddAsync(user);
            await _userRepository.SaveChangesAsync();

            return new UserDto {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
            };

        }

        public async Task<AuthResponse> LoginAsync(AuthLoginRequest req) { 
            var email = req.Email.ToLowerInvariant();
            var user = await _userRepository.GetByEmailAsync(email);

            if (user is null || !_passwordHasher.Verify(req.Password, user.PasswordHashed)) { 
                throw new Exception("Invalid Email or Password");
            }

            var token = _tokenService.CreateAccessToken(user);

            return new AuthResponse
            {
                AccessToken = token,
                User = new UserDto
                {
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email,
                }

            };  

        }


        public async Task<UserDto> MeAsync(int userId) { 
            var user = await _userRepository.GetByIdAsync(userId);

            if (user is null) {
                throw new Exception("User Not Found");
            }

            return new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
            };


        }



    }
}
