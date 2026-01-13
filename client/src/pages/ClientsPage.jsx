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
      <h2 className="mb-3">Clients Page</h2>

      <h2>Create Client</h2>
      <form onSubmit={onCreate} action="">


        <label> Client Name </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label> Client Abn </label>
        <input type="text" value={abn} onChange={(e) => setAbn(e.target.value)} required />

        <label> Client Phone Number </label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />

        <button className="btn btn-primary">Create</button>

      </form>

      <div className="all-clients">
        <h3>All Clients</h3>
        {loading ?
          (
            <div>Loading CLients...</div>
          ) :
          (
            <table>
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