import http from "./http";

export async function getInvoices() {
    const res = await http.get("/api/invoice");
    console.log(res.data);
    return res.data;
}

export async function getInvoiceDetails(invoiceId) {
    const res = await http.get(`/api/invoice/${invoiceId}`);
    console.log(res.data);
    return res.data;
}

export async function createInvoice(payload) {
    const res = await http.post("/api/invoice", payload);
    return res.data;
}