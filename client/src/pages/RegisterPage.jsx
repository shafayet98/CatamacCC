import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../api/authapi";
import { useAuth } from "../auth/AuthContext";


export default function RegisterPage() {
    const { login } = useAuth();
    const nav = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);

    async function onSubmit(e) {
        e.preventDefault();
        setErr("");
        setLoading(true);

        try {
            const data = await registerApi({ username, email, password });
            login(data);
            nav("/dashboard");
        } catch (ex) {
            setErr(ex?.response?.data?.message || "Register failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h1>Register Page</h1>
            <form onSubmit={onSubmit} action="">

                <label> Username </label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

                <label> Email </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label> Password </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <button className="btn btn-warning" disabled={loading}>
                    {loading ? "Creating..." : "Register As Admin"}
                </button>

                <div className="">
                    Already have an Account? <Link to="/login">Login</Link>
                </div>

            </form>
        </>
    )
}