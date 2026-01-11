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
    public class InvoiceRepository: IInvoiceRepository
    {

        private readonly CatamacDbContext _db;
        public InvoiceRepository(CatamacDbContext db)
        {
            _db = db;
        }

        public Task<List<Invoice>> GetAllAsync() { 
            return _db.Invoices.AsNoTracking().OrderByDescending(i => i.InvoiceDate).ToListAsync();

        }
        public Task<Invoice?> GetByIdDetailsAsync(int id)
        { 
            return _db.Invoices.Include(i => i.Client).Include(i => i.InvoiceLineItems).FirstOrDefaultAsync(i => i.Id == id);
        }
        public Task<bool> InvoiceCodeExistsAsync(string invoiceCode)
        {
            return _db.Invoices.AnyAsync(i => i.InvoiceCode == invoiceCode);
        }
        public Task AddAsync(Invoice invoice)
        { 
            return _db.Invoices.AddAsync(invoice).AsTask();
        }
        public Task SaveChangesAsync()
        { 
            return _db.SaveChangesAsync();
        }
    }
}
