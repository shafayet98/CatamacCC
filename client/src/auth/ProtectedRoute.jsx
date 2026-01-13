import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }){
    const { isLoggedIn, loading } = useAuth();

    if (loading) return <div className="text-center py-5">Loading...</div>;

    if (!isLoggedIn){
        return <Navigate to= "/login" replace />
    }

    return children;
}