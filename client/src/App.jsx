import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import ProtectedRoute from './auth/ProtectedRoute'
import Layout from './components/Layout'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ClientsPage from './pages/ClientsPage'
import ProductsPage from './pages/ProductsPage'
import InvoicesPage from './pages/InvoicesPage'
import InvoiceCreatePage from './pages/InvoiceCreatePage'
import InvoiceDetailsPage from './pages/InvoiceDetailsPage'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* if user goes to just "/" path take them to dahboard */}
          <Route path = "/" element={ <Navigate to = "/dashboard" replace/> }/>

          {/* not protected */}
          <Route path = "/login" element={<LoginPage/>}/>
          <Route path = "/register" element={<RegisterPage/>}/>

          {/* protected routes */}
          <Route path="/dashboard" element={ <ProtectedRoute> <Layout> <DashboardPage/> </Layout> </ProtectedRoute>}/>
          <Route path="/clients" element={ <ProtectedRoute> <Layout> <ClientsPage/> </Layout> </ProtectedRoute>}/>
          <Route path="/products" element={ <ProtectedRoute> <Layout> <ProductsPage/> </Layout> </ProtectedRoute>}/>
          <Route path="/invoices" element={ <ProtectedRoute> <Layout> <InvoicesPage/> </Layout> </ProtectedRoute>}/>
          <Route path="/invoices/new" element={ <ProtectedRoute> <Layout> <InvoiceCreatePage/> </Layout> </ProtectedRoute>}/>
          <Route path="/invoices/:invoiceId" element={ <ProtectedRoute> <Layout> <InvoiceDetailsPage/> </Layout> </ProtectedRoute>}/>

          <Route path="*" element={<div className="p-4">Not Found</div>} />
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
