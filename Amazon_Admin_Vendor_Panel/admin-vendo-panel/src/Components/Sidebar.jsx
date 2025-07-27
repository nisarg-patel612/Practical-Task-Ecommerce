import React from "react";

const Sidebar = ({ role, permissions }) => {
    return (
        <div className="bg-dark text-white p-3" style={{ minHeight: '100vh', width: '250px' }}>
            <h5>{role === 'admin' ? 'Admin Panel' : 'Vendor Panel'}</h5>
            <ul className="nav flex-column">
                {role === 'admin' && (
                    <>
                        <li><Link to="/admin/dashboard" className="nav-link text-white">Dashboard</Link></li>
                        <li><Link to="/admin/add-vendor" className="nav-link text-white">Add Vendor</Link></li>
                        <li><Link to="/admin/products" className="nav-link text-white">All Products</Link></li>
                    </>
                )}

                {role === 'vendor' && (
                    <>
                        {permissions.includes('add') && <li><Link to="/vendor/add-product" className="nav-link text-white">Add Product</Link></li>}
                        {permissions.includes('update') && <li><Link to="/vendor/update-product" className="nav-link text-white">Update Product</Link></li>}
                        {permissions.includes('delete') && <li><Link to="/vendor/delete-product" className="nav-link text-white">Delete Product</Link></li>}
                        <li><Link to="/vendor/products" className="nav-link text-white">My Products</Link></li>
                    </>
                )}
            </ul>
        </div>
    )
}

export default Sidebar;