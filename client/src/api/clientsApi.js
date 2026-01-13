import http from './http'

export async function getClients() {
    const res = await http.get("/api/client");
    return res.data;
}

export async function createClient(payload) {
    const res = await http.post("/api/client", payload);
    return res.data;
}

