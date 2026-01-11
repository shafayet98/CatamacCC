using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Catamac.Domain.Entities;
using Catamac.Infrastructure.Persistence;
using Catamac.Application.Interfaces;

using Microsoft.EntityFrameworkCore;

namespace Catamac.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly CatamacDbContext _db;

        public UserRepository(CatamacDbContext db)
        {
            _db = db;
        }

        public Task<User?> GetByEmailAsync(string email)
        {
            return _db.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public Task<User?> GetByIdAsync(int id)
        {
            return _db.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public Task<bool> EmailExistsAsync(string email)
        {
            return _db.Users.AnyAsync(u => u.Email == email);
        }

        public Task AddAsync(User user)
        {
            return _db.Users.AddAsync(user).AsTask();
        }

        public Task SaveChangesAsync()
        {
            return _db.SaveChangesAsync();
        }


    }
}
