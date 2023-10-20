import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const logout=()=>{
        if(localStorage.authToken){
            localStorage.removeItem("authToken");
            const path = "/signup";
            navigate(path);
        }
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary d-flex justify-content-center">
            <form className="float-end">
                <Link className="btn btn-outline-success mx-1" to="/login" role="button">Login</Link>
                <Link className="btn btn-success mx-1" to="/signup" role="button">Signup</Link>
                <Link className="btn btn-danger" role="button" to="/signup" onClick={logout}>Log out</Link>
            </form>
        </nav>
    )
}

export default Navbar