import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInvoices } from "../api/InvoicesApi";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");


  async function load() {
    setErr("");
    setLoading(true);
    try {
      const data = await getInvoices();
      setInvoices(data);
    } catch (ex) {
      setErr(ex?.response?.data?.message || "Failed to load invoices");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h3 className="text-decoration-underline">All Invoices</h3>
      <Link className="create-invoice-link" to="/invoices/new">Create New Invoices</Link>


      {err ? <div className="alert alert-danger">{err}</div> : null}


      <div className="mt-4">
        {loading ? (
          <div>
            <div>Loading...</div>
          </div>
        ) : (
          <div>
            {invoices.map((inv) => (
              <div className="card mb-2 w-50" key={inv.id}>
                <div className="card-body">
                  <h5 className="card-title">Invoice Code: {inv.invoiceCode}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Date: {new Date(inv.invoiceDate).toLocaleDateString()}</h6>
                  <p>Client ID: {inv.clientId}</p>
                  <p className="fw-bold fs-20">Total Order Amount: {Number(inv.totalAmount)}</p>
                  <Link className="card-link" to={`/invoices/${inv.id}`}>Invoice Details</Link>
                </div>
                <br />
              </div>
            ))}
          </div>
        )
        }
      </div>
    </div>

  );



}