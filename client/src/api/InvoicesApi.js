import http from "./http";

export async function getInvoices() {
    const res = await http.get("/api/invoice");
    return res.data;
}

export async function getInvoiceDetails(invoiceId) {
    const res = await http.get(`/api/invoice/${invoiceId}`);
    return res.data;
}

export async function createInvoice(payload) {
    const res = await http.post("/api/invoice", payload);
    return res.data;
}