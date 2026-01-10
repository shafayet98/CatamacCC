using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catamac.Domain.Entities
{
    public class Invoice
    {
        public int Id { get; set; }
        // FK
        public int ClientId { get; set; }


        public string InvoiceCode { get; set; } = null!;
        public DateTime InvoiceDate { get; set; }

        public decimal TotalAmount { get; set; }

        // many invoices to one client
        public Client? Client { get; set; }

        // 1 invoice has many Invoice LineItems
        public List<InvoiceLineItem> InvoiceLineItems { get; set; } = new();


    }
}
