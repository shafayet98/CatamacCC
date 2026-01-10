using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catamac.Domain.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Sku { get; set; } = null!;
        public decimal UnitPrice { get; set; }

        // 1 product to many Invoice LineItems
        public List<InvoiceLineItem> InvoiceLineItems { get; set; } = new();
    }
}
