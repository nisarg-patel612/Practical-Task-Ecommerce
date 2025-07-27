import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link to="/home" className="navbar-brand">
        <img src="/Amazon_Logo.png" alt="Amazon-Logo" width="120" />
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <Link to="/home" className="nav-link">
            All
          </Link>
          <Link to="/home/Electronics" className="nav-link">
            Electronics
          </Link>
          <Link to="/home/Fashion" className="nav-link">
            Fashion
          </Link>
          <Link to="/home/Wooden" className="nav-link">
            Wooden
          </Link>
        </ul>
        <ul className="navbar-nav ms-auto">
          {isLoggedIn ? (
            <li className="nav-item">
              <button onClick={handleLogout} className="btn btn-outline-light">
                Logout
              </button>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="btn btn-outline-light">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
