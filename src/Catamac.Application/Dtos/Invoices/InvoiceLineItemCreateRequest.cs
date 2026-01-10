using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catamac.Application.Dtos.Invoices
{
    public class InvoiceLineItemCreateRequest
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        // optional price override

        public decimal? UnitPriceOverride { get; set; }
    }
}
