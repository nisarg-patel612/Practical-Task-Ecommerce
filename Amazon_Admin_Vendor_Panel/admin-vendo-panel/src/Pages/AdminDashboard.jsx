import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }


    return (
        <div className="d-flex">
            <div className="bg-dark text-white p-3" style={{ minHeight: '100vh' , width: '250px'}}>
                <h4>Admin Panel</h4>
                <ul className="nav flex-column">
                    <li>
                        <Link to='/admin/dashboard' className="nav-link text-white">Dashboard</Link>
                    </li>
                    <li>
                        <Link to='/admin/add-product' className="nav-link text-white">Add Product</Link>
                    </li>

                    <li>
                        <Link to='/admin/add-vendor' className="nav-link text-white">Add Vendor</Link>
                    </li>
                    <li>
                        <Link to='/admin/products' className="nav-link text-white">All Prodcuts</Link>
                    </li>
                </ul>
            </div>
            <div className="p-4 w-100">
                <h2>Welcome to Admin Dashboard</h2>
                <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default AdminDashboard;