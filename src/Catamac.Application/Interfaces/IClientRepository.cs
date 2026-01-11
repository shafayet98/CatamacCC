using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Catamac.Domain.Entities;

namespace Catamac.Application.Interfaces
{
    public interface IClientRepository
    {
        Task<List<Client>> GetAllAsync();
        Task<Client?> GetByIdAsync(int id);
        Task AddAsync(Client client);
        Task<bool> AbnExistsAsync(string abn);
        Task SaveChangesAsync();
    }
}
