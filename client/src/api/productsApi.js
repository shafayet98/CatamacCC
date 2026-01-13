import http from "./http";

export async function getProducts() {
    const res = await http.get("/api/product");
    console.log(res);
    return res.data;
}

export async function createProducts(payload) {
    const res = await http.post("/api/product", payload);
    return res.data;
}