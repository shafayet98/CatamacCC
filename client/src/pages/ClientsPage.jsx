import { useEffect, useState } from "react";
import { createClient, getClients } from "../api/clientsApi";

export default function ClientsPage() {

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [name, setName] = useState("");
  const [abn, setAbn] = useState("");
  const [phone, setPhone] = useState("");

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const data = await getClients();
      setClients(data);
    } catch (ex) {
      setErr(ex?.response?.data?.message || "Failed to load clients");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onCreate(e) {
    e.preventDefault();
    setErr("");
    try {
      await createClient({ name, abn, phone });
      setName(""); setAbn(""); setPhone("");
      await load();
    } catch (ex) {
      setErr(ex?.response?.data?.message || "Failed to create client");
    }
  }

  return (
    <div className="">
      <h2 className="text-center">Clients Page</h2>

      <h2 className="text-decoration-underline">Create Client</h2>
      <form className="d-flex flex-column gap-2 mt-3 w-50" onSubmit={onCreate} action="">


        <label> Client Name </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label> Client Abn </label>
        <input type="text" value={abn} onChange={(e) => setAbn(e.target.value)} required />

        <label> Client Phone Number </label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />

        <button className="btn btn-warning fw-bold">Create A Client</button>

      </form>

      <div className="all-clients mt-5">
        <h3 className="text-decoration-underline">All Clients</h3>
        {loading ?
          (
            <div>Loading CLients...</div>
          ) :
          (
            <table className="w-100 table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>ABN</th>
                  <th>Phone</th>
                </tr>
              </thead>

              <tbody>
                {
                  clients.map((c) => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.name}</td>
                      <td>{c.abn}</td>
                      <td>{c.phone}</td>
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