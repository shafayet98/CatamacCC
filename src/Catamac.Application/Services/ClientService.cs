using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Catamac.Application.Interfaces;
using Catamac.Domain.Entities;
using Catamac.Application.Dtos.Clients;

namespace Catamac.Application.Services
{
    public class ClientService
    {
        private readonly IClientRepository _clientRepository;

        public ClientService(IClientRepository clientRepository)
        {
            _clientRepository = clientRepository;
        }

        public async Task<List<ClientDto>> GetAllAsync() { 
            
            var clients = await _clientRepository.GetAllAsync();
            return clients.Select(c => new ClientDto
            {
                Id = c.Id,
                Name = c.Name,
                Abn = c.Abn,
                Phone = c.Phone
            }).ToList();


        }

        public async Task<ClientDto> CreateAsync(ClientCreateRequest req) {
            var abn = req.Abn.Trim();

            if (await _clientRepository.AbnExistsAsync(abn)) {
                throw new Exception("Client Already Exists");
            }

            var client = new Client
            {
                Name = req.Name.Trim(),
                Abn = abn,
                Phone = req.Phone.Trim()

            };

            await _clientRepository.AddAsync(client);
            await _clientRepository.SaveChangesAsync();

            return new ClientDto
            {
                Id = client.Id,
                Name = client.Name,
                Abn = client.Abn,
                Phone = client.Phone

            };

        }

    }
}
