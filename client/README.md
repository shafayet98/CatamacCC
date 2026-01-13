# Catamac Invoice System: Frontend (React + Vite + Bootstrap)

This folder contains the **frontend** for the Catamac system.  
It is a **React (JavaScript) + Vite** app using **Bootstrap** for styling, and it talks to the .NET backend via REST APIs.

---

## Tech Stack

- React (JavaScript)
- Vite
- React Router
- Axios
- Bootstrap

---

## Requirements

- Node.js **20+** (recommended: 22 LTS)
- npm

Check versions:
```bash
node -v
npm -v


## Getting Started
```bash
[Go to Client Folder] cd client
[Install Dependencies] npm install
[Configure Environment Variable] VITE_API_BASE_URL=http://localhost:5236 [This should point to the backend root URL (do not include /api)]
Example API call becomes:
http.post("/api/auth/login") → http://localhost:5236/api/auth/login
[Run the dev server] npm run dev
```

## Project Structure
client/
  src/
    api/
      http.js              # axios instance (baseURL + token interceptor: automatically attaches the header (token + metadata))
      authApi.js
      clientsApi.js
      productsApi.js
      invoicesApi.js
    auth/
      AuthContext.jsx      # global auth state (login/logout/me)
      ProtectedRoute.jsx   # route protection
      authStorage.js       # localStorage helpers - saves/removes the token from localStrorage
    components/
      Layout.jsx
      NavbarApp.jsx
    pages/
      LoginPage.jsx
      RegisterPage.jsx
      DashboardPage.jsx
      ClientsPage.jsx
      ProductsPage.jsx
      InvoicesPage.jsx
      InvoiceCreatePage.jsx
      InvoiceDetailsPage.jsx
    main.jsx
    App.jsx

## Authentication Flow
* Login/Register returns an AuthResponse containing:
    - accessToken
    - user
* The app stores this in localStorage under the key auth.
* Axios automatically attaches the token using the Authorization: Bearer <token> header.
* On app startup, the frontend calls:
    - GET /api/auth/me to validate the token and refresh user data.
* Protected routes are guarded by ProtectedRoute.

## Available pages
Public:
- /login
- /register
Protected:
- /dashboard
- /clients
- /products
- /invoices
- /invoices/new
- /invoices/:invoiceId

### Common Issues
CORS errors
If there is a CORS error in the browser console, update backend CORS settings to allow:
http://localhost:5173
(I have already added this in backend, If the backend opens in differnet PORT, please update in the backend Program.cs file)