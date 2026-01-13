import { useAuth } from '../auth/AuthContext';

export default function DashboardPage() {

  const { user } = useAuth();

  return (
    <div className="">
      <h2 className="mb-2">Dashboard</h2>
      <p className="text-muted">
        Logged in as <b>{user?.email}</b>
      </p>

      <div className="alert alert-info">
        Use the navbar to manage Clients, Products, and Invoices.
      </div>
    </div>
  )
}