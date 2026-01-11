using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Catamac.Domain.Entities;

namespace Catamac.Application.Interfaces
{
    public interface IInvoiceRepository
    {
        Task<List<Invoice>> GetAllAsync();
        Task<Invoice?> GetByIdDetailsAsync(int id);
        Task<bool> InvoiceCodeExistsAsync(string invoiceCode);
        Task AddAsync(Invoice invoice);
        Task SaveChangesAsync();
    }
}
