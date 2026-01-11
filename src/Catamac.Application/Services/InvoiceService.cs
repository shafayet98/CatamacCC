using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


using Catamac.Application.Interfaces;
using Catamac.Domain.Entities;
using Catamac.Application.Dtos.Invoices;

namespace Catamac.Application.Services
{
    public class InvoiceService
    {

        private readonly IInvoiceRepository _invoiceRepository;
        private readonly IClientRepository _clientRepository;
        private readonly IProductRepository _productRepository;

        public InvoiceService(IInvoiceRepository invoiceRepository, IClientRepository clientRepository, IProductRepository productRepository)
        {
            _invoiceRepository = invoiceRepository;
            _clientRepository = clientRepository;
            _productRepository = productRepository;
        }


        // deals with getting all the invoices
        public async Task<List<InvoiceDto>> GetAllAsync() { 
            
            var invoices = await _invoiceRepository.GetAllAsync();

            return invoices.Select(i => new InvoiceDto
            {
                Id = i.Id,
                ClientId = i.ClientId,
                InvoiceCode = i.InvoiceCode,
                InvoiceDate = i.InvoiceDate,
                TotalAmount = i.TotalAmount
            }).ToList();
        }

        // deals with getting one invoice details by Id
        public async Task<InvoiceDetailsDto> GetByIdAsync(int invoiceId) { 
            
            var invoice = await _invoiceRepository.GetByIdDetailsAsync(invoiceId);
            if (invoice is null)
            {
                throw new Exception("Invoice not found");
            }


            return new InvoiceDetailsDto
            {
                Id = invoice.Id,
                ClientId = invoice.ClientId,
                ClientName = invoice.Client?.Name ?? "Unknown",
                InvoiceCode = invoice.InvoiceCode,
                InvoiceDate = invoice.InvoiceDate,
                TotalAmount = invoice.TotalAmount,
                LineItems = invoice.InvoiceLineItems.Select(li => new InvoiceLineItemDto
                {
                    Id = li.Id,
                    ProductId = li.ProductId,
                    ProductNameSnapshot = li.ProductNameSnapshot ?? "Unknown",
                    Quantity = li.Quantity,
                    UnitPrice = li.UnitPrice,
                }).ToList()
            };
        }

        public async Task<InvoiceDto> CreateAsync(InvoiceCreateRequest req) {

            // check if the invoice already exists
            var invoiceCode = req.InvoiceCode.Trim();

            if (await _invoiceRepository.InvoiceCodeExistsAsync(invoiceCode)) { 
                throw new Exception("Invoice code already exists");
            }

            // check if the client exists or not
            var client = await _clientRepository.GetByIdAsync(req.ClientId);

            if (client is null) { 
                throw new Exception("Client not found");
            }

            if (req.LineItems.Count == 0) { 
                throw new Exception("Invoice must have at least one line item");
            }

            var invoice = new Invoice
            {
                ClientId = req.ClientId,
                InvoiceCode = invoiceCode,
                InvoiceDate = req.InvoiceDate
            };

            decimal totalAmount = 0m;

            foreach (var li in req.LineItems)
            {
                // check the quantity set by user
                if (li.Quantity <= 0) throw new Exception("Quantity must be greater than zero");

                var product = await _productRepository.GetByIdAsync(li.ProductId);
                if (product is null) throw new Exception($"Product with ID {li.ProductId} not found");

                var unitPrice = li.UnitPriceOverride ?? product.UnitPrice;

                var lineItem = new InvoiceLineItem
                {
                    ProductId = li.ProductId,
                    Quantity = li.Quantity,
                    UnitPrice = unitPrice,
                    ProductNameSnapshot = product.Name,
                    ProductSkuSnapshot = product.Sku
                };

                totalAmount += unitPrice * li.Quantity;
                invoice.InvoiceLineItems.Add(lineItem);
            }

            invoice.TotalAmount = totalAmount;

            await _invoiceRepository.AddAsync(invoice);
            await _invoiceRepository.SaveChangesAsync();

            return new InvoiceDto
            {
                Id = invoice.Id,
                ClientId = invoice.ClientId,
                InvoiceCode = invoice.InvoiceCode,
                InvoiceDate = invoice.InvoiceDate,
                TotalAmount = invoice.TotalAmount
            };

        }
    }
}
