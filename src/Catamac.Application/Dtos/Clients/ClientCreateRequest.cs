using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catamac.Application.Dtos.Clients
{
    public class ClientCreateRequest
    {
        public string Name { get; set; } = null!;
        public string Abn { get; set; } = null!;
        public string Phone { get; set; } = null!;
    }
}
