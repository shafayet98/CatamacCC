import axios from "axios";

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

http.interceptors.request.use((config) =>{

    const raw = localStorage.getItem("auth");
    if(raw) {
        const {accessToken} = JSON.parse(raw);
        if (accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }
    return config;
});

export default http;