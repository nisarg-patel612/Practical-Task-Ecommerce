import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../Services/api";

const VendorDashboard = () => {
  const [permissions, setPermissions] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/vendor/profile");
        setPermissions(res.data.permissions || []);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="d-flex">
      <div
        className="bg-secondary text-white p-3"
        style={{ minHeight: "100vh", width: "250px" }}
      >
        <h4>Vendor Panel</h4>
        <ul className="nav flex-column">
          {permissions.includes("add") && (
            <li>
              <Link to="/vendor/add-product" className="nav-link text-white">
                Add Product
              </Link>
            </li>
          )}
          {permissions.includes("update") && (
            <li>
              <Link to="/vendor/update-product" className="nav-link text-white">
                Update Product
              </Link>
            </li>
          )}
          {permissions.includes("delete") && (
            <li>
              <Link to="/vendor/delete-product" className="nav-link text-white">
                Delete Product
              </Link>
            </li>
          )}
          <li>
            <Link to="/vendor/products" className="nav-link text-white">
              My Products
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-4 w-100">
        <h2>Welcome Vendor</h2>
        <button className="btn btn-danger mt-3" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default VendorDashboard;
