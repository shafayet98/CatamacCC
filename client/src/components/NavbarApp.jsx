import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";


export default function NavbarApp() {


    const { isLoggedIn, user, logout } = useAuth();
    const nav = useNavigate();

    function handleLogout() {
        logout();
        nav("/login");
    }

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">
                <Link className="navbar-brand" to="/dashboard"> Catamac</Link>


                <div className="collapse navbar-collapse show">
                    {/* left side of the nav */}
                    {isLoggedIn ?
                        (<ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/clients">Clients</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/products">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/invoices">Invoices</Link>
                            </li>
                        </ul>
                        ) : (<div className="me-auto" />)

                    }

                    {/* rightside of the nav */}
                    <div className="d-flex align-items-center gap-3 text-white">
                        {isLoggedIn ?
                            (<>
                                <span className="small">Hi, {user?.username}</span>
                                <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                                    Logout
                                </button>
                            </>) : (<>
                                <Link className="btn btn-outline-light btn-sm" to="/login">Login</Link>
                                <Link className="btn btn-warning btn-sm" to="/register">Register</Link>
                            </>)

                        }
                    </div>
                    
                </div>
            </div>
        </nav >


    )

}

