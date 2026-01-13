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


    async function onSubmit(e) {
        e.preventDefault();
        setErr("");
        setLoading(true);

        try {
            const data = await loginApi({ email, password });
            login(data);
            nav("/dashboard");
        } catch (ex) {
            setErr(ex.response.data.message || "Login Failed");
        } finally {
            setLoading(false);
        }
    }


    return (
        <>

            <div className="container">
                <h1 className="text-center">Catamac: Login Page</h1>

                <div className="row justify-content-center mt-5">
                    <div className="col-12 col-sm-10 col-md-6 col-lg-4">
                        <form className="d-flex flex-column gap-3" onSubmit={onSubmit} action="">
                            <label> Email </label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                            <label> Password </label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                            <button className="btn btn-outline-dark" disabled={loading}>
                                {loading ? "Please wait, logging in." : "Login"}
                            </button>

                            <div className="">
                                No Account? <Link to="/register">Register</Link>
                            </div>
                        </form >
                        {err ? <div className="alert alert-danger mt-2">{err}</div> : null}
                    </div>
                </div>
            </div>

        </>
    )
}