## Catamac Invoice System
#### Overview

This project is an invoice recording system for Catamac. It allows an admin user to:
- Register/Login and receive a JWT token
- Manage Clients
- Manage Products
- Create and view Invoices with Line Items (product + quantity + price override)

[Youtube: Catamac Invoice System Walk-through](https://youtu.be/LA80Dc2GNoQ)

## Tech Stack
#### Backend
- ASP.NET Core Web API (.NET 9)
- Entity Framework Core (EF Core)
- SQL Server (local instance / SQLEXPRESS)
- JWT authentication
#### Frontend
- React + JS + Vite + Bootstrap (Inside the Client Folder)

## Architecture & Code Structure
```txt
src/
  Catamac.Domain           -> Entities (business data models)
  Catamac.Application      -> DTOs + Interfaces + Services (use cases)
  Catamac.Infrastructure   -> EF Core DbContext + Repository implementations + Security (JWT/Hash)
  CatamacInvoice.API       -> Controllers + DI setup + middleware
client/                    -> React frontend (optional)
docs/                      -> DB diagram / notes
```

## ASP .NET RQST Pipeline Flow
![ASP dot net Request Pipeline](docs/ASP%20dot%20net%20Request%20Pipeline.jpg)


## Database Design (ERD)
![Catamac DB Design](docs/Catamac%20DB%20Design.png)

#### Core entities:
- User (Admin)
- Client
- Product
- Invoice
- InvoiceLineItem

#### Relationships:
- A Client has many Invoices (1 → many)
- An Invoice has many InvoiceLineItems (1 → many)
- A Product has many InvoiceLineItems (1 → many)

## Data Integrity Rules

#### Unique constraints / indexes:
- User.Email unique
- Client.Abn unique
- Product.Sku unique
- Invoice.InvoiceCode unique

#### Money precision:
Decimal fields use decimal(18,2) (HasPrecision(18,2))

#### Delete behaviors:
- Deleting a client is restricted if invoices exist (prevents orphan invoices)
- Deleting an invoice deletes its line items (cascade)
- Deleting a product is restricted if referenced by line items

## Authentication & Authorization
1. Admin registers: /api/auth/register
2. Admin logs in: /api/auth/login
3. API returns accessToken
4. Client sends token in every request: Authorization: Bearer <token>
5. Protected endpoints require [Authorize]

## API Endpoints
```bash
Auth
------

[POST] : /api/auth/register
[POST] : /api/auth/login
[GET] : /api/auth/me

Clients (Protected)
--------------------
[GET] /api/client
[POST] /api/client

Products (Protected)
--------------------
[GET] /api/product
[POST] /api/product

Invoices (Protected)
--------------------
[GET] /api/invoices
[GET] /api/invoices/{invoiceId}
[POST] /api/invoices
```

## How to RUN (Backend)
#### Requirements
1. .NET SDK 9 installed
2. SQL Server Express installed (SQLEXPRESS)
3. SSMS optional
4. Postman optional

### 1. Configure DB Connection
**In appsettings.Development.json (not committed):**
```JSON
{
  "ConnectionStrings": {
    "Default": "Server=localhost\\SQLEXPRESS;Database=CatamacInvoices;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "Jwt": {
    "Key": "YOUR_LONG_RANDOM_SECRET_32+_CHARS",
    "Issuer": "Catamac",
    "Audience": "Catamac",
    "ExpiresMinutes": 120
  }
}
```
### 2. Run EF migrations
**From repo root:**
```bash
dotnet ef database update `
  --project .\src\Catamac.Infrastructure\Catamac.Infrastructure.csproj `
  --startup-project .\src\CatamacInvoice.API\CatamacInvoice.API.csproj
```
### 3. Run Backend API
```bash
In Visual Studio: Run CatamacInvoice.API
```
### Test Login
```bash
Email: testadmin@gmail.com
Password: testadmin
```

#### Thank you!!