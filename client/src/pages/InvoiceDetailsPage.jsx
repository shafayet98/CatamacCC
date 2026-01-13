import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInvoiceDetails } from "../api/InvoicesApi";

export default function InvoiceDetailsPage() {

  const { invoiceId } = useParams();
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setErr("");
      setLoading(true);
      try {
        const res = await getInvoiceDetails(invoiceId);
        setData(res);
      } catch (ex) {
        setErr(ex?.response?.data?.message || "Failed to load invoice");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [invoiceId]);

  if (loading) return <div>Loading...</div>;
  if (err) return <div className="alert alert-danger">{err}</div>;
  if (!data) return null;

  return (

    <div>
      <h2>Invoice: #{data.invoiceCode}</h2>
      <h3>Client Name: {data.clientName}</h3>
      <h3>Date: {new Date(data.invoiceDate).toLocaleDateString()}</h3>


      <div className="card card-body mb-3">
        <h5 className="mb-3">Line Items</h5>

        {data.lineItems.length === 0 ? (
          <div className="text-muted">No line items.</div>
        ) : (
          <div>
            {data.lineItems.map((li) => {
              const unitPrice = Number(li.unitPrice) || 0;
              const qty = Number(li.quantity) || 0;
              const lineTotal = unitPrice * qty;

              return (
                <div key={li.id} className="list-group mb-3">
                  <div className="list-group-item">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <div className="fw-semibold">{li.productNameSnapshot}</div>
                        <div className="text-muted small">SKU: {li.productSkuSnapshot}</div>
                      </div>

                      <div className="text-end">
                        <div>
                          <span className="text-muted small">Qty </span>
                          <span className="fw-semibold">{qty}</span>
                        </div>
                      </div>
                    </div>

                    <hr className="my-2" />

                    <div className="d-flex justify-content-between">
                      <div className="text-muted">Unit Price</div>
                      <div className="fw-semibold">${unitPrice.toFixed(2)}</div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <div className="text-muted">Line Total</div>
                      <div className="fw-semibold">${lineTotal.toFixed(2)}</div>
                    </div>
                  </div>


                </div>
              );
            })}

            <div className="alert alert-warning text-end">
              Total Amount: <b>${Number(data.totalAmount).toFixed(2)}</b>
            </div>
          </div>
        )}
      </div>

    </div>

  );
}