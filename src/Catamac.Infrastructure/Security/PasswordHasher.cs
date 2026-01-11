using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Catamac.Domain.Entities;
using Catamac.Application.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Catamac.Infrastructure.Security
{
    public class PasswordHasher : IPasswordHasher
    {
        private readonly PasswordHasher<User> _passwordHasher = new();

        public string Hash(string password)
        {
            return _passwordHasher.HashPassword(new User(), password);
        }

        public bool Verify(string password, string passwordHashed)
        { 
            return _passwordHasher.VerifyHashedPassword(new User(), passwordHashed, password) == PasswordVerificationResult.Success;
        }



    }
}
