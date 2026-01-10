using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catamac.Application.Dtos.Invoices
{
    public class InvoiceLineItemDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductNameSnapshot { get; set; } = null!;
        public string ProductSkuSnapshot { get; set; } = null!;
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }

        public decimal LineTotal => UnitPrice * Quantity;

    }
}
