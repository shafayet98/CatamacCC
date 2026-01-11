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
    public class ClientRepository : IClientRepository
    {
        private readonly CatamacDbContext _db;

        public ClientRepository(CatamacDbContext db)
        {
            _db = db;
        }

        public Task<List<Client>> GetAllAsync()
        { 
            return _db.Clients
                .AsNoTracking()
                .OrderBy(c => c.Name)
                .ToListAsync();
        }
        public Task<Client?> GetByIdAsync(int id)
        { 
            return _db.Clients
                .FirstOrDefaultAsync(c => c.Id == id);
        }
        public Task AddAsync(Client client)
        { 
            return _db.Clients.AddAsync(client).AsTask();
        }
        public Task<bool> AbnExistsAsync(string abn)
        { 
            return _db.Clients
                .AnyAsync(c => c.Abn == abn);
        }
        public Task SaveChangesAsync()
        { 
            return _db.SaveChangesAsync();
        }

    }
}
