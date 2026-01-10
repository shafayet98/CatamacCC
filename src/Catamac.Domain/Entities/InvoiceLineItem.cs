using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catamac.Domain.Entities
{
    public class InvoiceLineItem
    {
        public int Id { get; set; }

        // FK
        public int InvoiceId { get; set; }
        public int ProductId { get; set; }


        public int Quantity { get; set; }

        // snapshot
        public decimal UnitPrice { get; set; }
        public string ProductNameSnapshot { get; set; } = null!;
        public string ProductSkuSnapshot { get; set; } = null!;

        // many InvoiceLineItems to one Invoice
        public Invoice? Invoice { get; set; }
        // many InvoiceLineItems to one Product
        public Product? Product { get; set; }
    }
}
