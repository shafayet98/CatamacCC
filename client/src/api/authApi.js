import http from "./http";

export async function registerApi(payload) {
    const res = await http.post("/api/auth/register", payload);
    return res.data;
}

export async function loginApi(payload) {
    const res = await http.post("/api/auth/login", payload);
    return res.data;
}

export async function meApi() {
    const res = await http.get("/api/auth/me");
    return res.data;
}