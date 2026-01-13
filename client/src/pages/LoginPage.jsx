import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../api/authapi";
import { useAuth } from "../auth/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    const nav = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);


    async function onSubmit(e){
        e.preventDefault();
        setErr("");
        setLoading(true);

        try{
            const data = await loginApi({ email, password });
            login(data);
            nav("/dashboard");
        }catch(ex){
            setErr(ex.response.data.message || "Login Failed");
        }finally{
            setLoading(false);
        }
    }


    return (
        <>
            <h1>Login Page</h1>
            <form onSubmit={onSubmit} action="">
                <label> Email </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>

                <label> Password </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>

                <button disabled={loading}>
                    {loading ? "Please wait, logging in." : "Login"}
                </button>

                <div className="">
                    No Account? <Link to="/register">Register</Link>
                </div>

            </form>
        </>
    )
}