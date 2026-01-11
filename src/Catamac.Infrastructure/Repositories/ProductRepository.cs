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
    public class ProductRepository: IProductRepository
    {

        private readonly CatamacDbContext _db;

        public ProductRepository(CatamacDbContext db)
        {
            _db = db;
        }

        public Task<List<Product>> GetAllAsync()
        { 
            return _db.Products.AsNoTracking().OrderBy(p => p.Name).ToListAsync();
        }
        public Task<Product?> GetByIdAsync(int id)
        {
            return _db.Products.FirstOrDefaultAsync(p => p.Id == id);
        }
        public Task AddAsync(Product product)
        {
            return _db.Products.AddAsync(product).AsTask();
        }
        public Task<bool> SkuExistsAsync(string sku)
        {
            return _db.Products.AnyAsync(p => p.Sku == sku);
        }
        public Task SaveChangesAsync()
        { 
            return _db.SaveChangesAsync();
        }

    }
}
