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
      <h3>All Invoices</h3>
      <Link to="/invoices/new">Create New Invoices</Link>


      {err ? <div className="alert alert-danger">{err}</div> : null}


      <div className="card">
        {loading ? (
          <div>
            <div>Loading...</div>
          </div>
        ) : (
          <div>
            <ul>
              {invoices.map((inv) => (
                <div key={inv.id}>
                  <li>{inv.id}</li>
                  <li>{inv.invoiceCode}</li>
                  <li>{inv.clientId}</li>
                  <li>{new Date(inv.invoiceDate).toLocaleDateString()}</li>
                  <li>{Number(inv.totalAmount)}</li>
                  <li>
                    <Link to={`/invoices/${inv.id}`}>View Details</Link>
                  </li>
                  <br />
                </div>
              ))}
            </ul>
          </div>
          )
        }
      </div>
    </div>

  );



}