using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catamac.Domain.Entities
{
    public class Client
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Abn { get; set; } = null!;
        public string Phone { get; set; } = null!;

        // client has mane invoices
        public List<Invoice> Invoices { get; set; } = new();

    }
}
