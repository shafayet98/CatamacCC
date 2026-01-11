using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Catamac.Domain.Entities;
using Catamac.Application.Interfaces;
using Catamac.Application.Dtos.Products;

namespace Catamac.Application.Services
{

    public class ProductService
    {


        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<List<ProductDto>> GetAllAsync() {

            var products = await _productRepository.GetAllAsync();

            return products.Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Sku = p.Sku,
                UnitPrice = p.UnitPrice
            }).ToList();

        }

        public async Task<ProductDto> CreateAsync(ProductCreateRequest req) {

            var sku = req.Sku.Trim();

            if (await _productRepository.SkuExistsAsync(sku)) { 
                throw new Exception("Product already exists.");
            }

            var product = new Product
            {
                Name = req.Name.Trim(),
                Sku = sku,
                UnitPrice = req.UnitPrice

            };

            await _productRepository.AddAsync(product);
            await _productRepository.SaveChangesAsync();

            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Sku = product.Sku,
                UnitPrice = product.UnitPrice
            };
        }
    }
}
