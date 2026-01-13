import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClients } from "../api/clientsApi";
import { getProducts } from "../api/productsApi";
import { createInvoice } from "../api/InvoicesApi";

export default function InvoiceCreatePage() {

  const nav = useNavigate();

  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);

  const [clientId, setClientId] = useState("");
  const [invoiceCode, setInvoiceCode] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(() => new Date().toISOString().slice(0, 10));


  const [lineItems, setLineItems] = useState([
    { productId: "", quantity: 1, unitPriceOverride: "" }
  ]);

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // load all the clients and products
  useEffect(() => {
    async function load() {
      try {
        const [c, p] = await Promise.all([getClients(), getProducts()]);
        setClients(c);
        setProducts(p);
      } catch (ex) {
        setErr(ex?.response?.data?.message || "Failed to load clients/products");
      }
    }
    load();
  }, []);

  // add one line of item
  function addLine() {
    setLineItems((prev) => [...prev, { productId: "", quantity: 1, unitPriceOverride: "" }]);
  }

  function removeLine(index) {
    setLineItems((prev) => prev.filter((li, i) => i !== index));
  }

  function updateLine(index, updatedObj) {
    setLineItems((prev) => prev.map((li, i) => {
      let next = li;

      if (i === index) {
        next = { ...li, ...updatedObj }
      }
      return next

    })
    );
  }

  function calculateLineTotal(li) {
    const p = products.find((p) => p.id === Number(li.productId));

    // furst checking the produt's unit price
    const basePrice = p ? Number(p.unitPrice) : 0;

    // if the admin override the price then we will store that in a var
    const override = li.unitPriceOverride !== "" ? Number(li.unitPriceOverride) : null;

    // now if the user overrided the price it'll in the price or set the base price
    const price = override ?? basePrice;

    return price * Number(li.quantity || 0);
  }

  let totalPrice = 0;
  for (const li of lineItems) {
    totalPrice += calculateLineTotal(li);
  }


  async function onSubmit(e) {
    e.preventDefault();
    setErr("");

    const payload = {
      clientId: Number(clientId),
      invoiceCode,
      invoiceDate: new Date(invoiceDate).toISOString(),
      lineItems: lineItems.map((li) => ({
        productId: Number(li.productId),
        quantity: Number(li.quantity),
        unitPriceOverride: li.unitPriceOverride === "" ? null : Number(li.unitPriceOverride),
      }))
    };


    if (!payload.clientId) return setErr("Please select a client.");
    if (!payload.invoiceCode.trim()) return setErr("Please enter invoice code.");
    if (payload.lineItems.some((li) => !li.productId || li.quantity <= 0)) {
      return setErr("Each line item must have a product and quantity > 0.");
    }

    setLoading(true);

    try {
      const created = await createInvoice(payload);
      if (created?.id) nav(`/invoices/${created.id}`);
      else nav("/invoices");
    } catch (ex) {
      setErr(ex?.response?.data?.message || "Failed to create invoice");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Create Invoice</h2>
      {err ? <div className="alert alert-danger">{err}</div> : null}

      <form onSubmit={onSubmit}>
        {/* select client from here */}
        <div className="">
          <label htmlFor="">Clients</label>
          <br />
          <select value={clientId} onChange={(e) => setClientId(e.target.value)}>
            <option value="">Select Client</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} (#{c.id})
              </option>
            ))}
          </select>
        </div>

        <br />
        {/* provide InvoiceCode */}
        <div className="">
          <label>Invoice Code</label>
          <br />
          <input value={invoiceCode} onChange={(e) => setInvoiceCode(e.target.value)} />
        </div>

        {/* put invoice date */}
        <div>
          <label>Invoice Date</label>
          <br />
          <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
        </div>
        <br />

        {/* create Line Item */}
        <div className="">
          <h3>Line Items</h3>

          <button type="button" onClick={addLine}>
            + Add Line
          </button>

          <ul>
            {lineItems.map((li, index) => {
              const selectedProduct = products.find((p) => p.id === Number(li.productId));
              const basePrice = selectedProduct ? Number(selectedProduct.unitPrice) : 0;
              const lineTotal = calculateLineTotal(li);

              return (
                <li key={index} style={{ marginTop: 12 }}>
                  {/* select product */}
                  <div>
                    <label>Product</label>
                    <br />
                    <select value={li.productId} onChange={(e) => updateLine(index, { productId: e.target.value })}>
                      <option value="">-- select product --</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.sku})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* select quantity */}
                  <div style={{ marginTop: 8 }}>
                    <label>Quantity</label>
                    <br />
                    <input type="number" min="1" value={li.quantity} onChange={(e) => updateLine(index, { quantity: e.target.value })} />
                  </div>

                  {/* override price */}
                  <div style={{ marginTop: 8 }}>
                    <label>
                      Price Override (optional){" "}
                      {li.productId ? `(base: ${basePrice.toFixed(2)})` : ""}
                    </label>
                    <br />
                    <input type="number" value={li.unitPriceOverride} onChange={(e) => updateLine(index, { unitPriceOverride: e.target.value })}
                      placeholder="leave empty to use base price"
                    />
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <b>Line Total: ${lineTotal.toFixed(2)}</b>
                  </div>
                  {/* remove the item */}
                  <div style={{ marginTop: 8 }}>
                    <button type="button" onClick={() => removeLine(index)} disabled={lineItems.length === 1}>Remove</button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <hr />
        {/* show overall total */}
        <div>
          <b>Total: ${totalPrice.toFixed(2)}</b>
        </div>
        <br />
        <button disabled={loading}>
          {loading ? "Creating..." : "Create Invoice"}
        </button>
      </form>
    </div>
  );
}