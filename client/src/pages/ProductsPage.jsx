import { useEffect, useState } from "react";
import { createProducts, getProducts } from "../api/productsApi";


export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [unitPrice, setUnitPrice] = useState("");


  async function load() {
    setErr("");
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (ex) {
      setErr(ex?.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => { load(); }, []);

  async function onCreate(e) {
    e.preventDefault();
    setErr("");

    try {
      await createProducts({ name, sku, unitPrice: Number(unitPrice) });
      setName(""); setSku(""); setUnitPrice("");
      await load();
    } catch (ex) {
      setErr(ex?.response?.data?.message || "Failed to create product");
    }
  }

  return(
    <div className="">
      <h2 className="mb-3">Products Page</h2>

      <h2>Create Product</h2>
      <form onSubmit={onCreate} action="">


        <label> Product Name </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label> Product sku </label>
        <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} required />

        <label> Product Unit Price </label>
        <input type="number" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} required />

        <button className="btn btn-primary">Create</button>

      </form>

      <div className="all-products">
        <h3>All Products</h3>
        {loading ?
          (
            <div>Loading Products...</div>
          ) :
          (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Sku</th>
                  <th>Unit Price</th>
                </tr>
              </thead>

              <tbody>
                {
                  products.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.name}</td>
                      <td>{p.sku}</td>
                      <td>{Number(p.unitPrice)}</td>
                    </tr>
                  ))
                }
              </tbody>


            </table>
          )

        }
      </div>

    </div>
  );
}