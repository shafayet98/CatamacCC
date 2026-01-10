using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catamac.Application.Dtos.Invoices
{
    public class InvoiceCreateRequest
    {
        public int ClientId { get; set; }
        public string InvoiceCode { get; set; } = null!;
        public DateTime InvoiceDate { get; set; }
        public List<InvoiceLineItemCreateRequest> LineItems { get; set; } = new();
    }
}
