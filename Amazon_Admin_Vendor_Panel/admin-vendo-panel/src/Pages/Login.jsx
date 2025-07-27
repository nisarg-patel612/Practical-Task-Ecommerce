import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/vendor/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err?.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="border rounded p-4 shadow-sm"
        style={{ width: "350px", backgroundColor: "#fff" }}
      >
        <div className="text-center mb-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="Amazon Logo"
            style={{ height: "30px" }}
          />
          <span style={{ fontSize: "16px", marginLeft: "2px" }}>.in</span>
        </div>

        <h5 className="fw-bold mb-3">Login account</h5>

        <div className="mb-2">
          <label className="mb-2 text-primary">Email:</label>
          <input
            className="form-control mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />

          <label className="mb-2 text-primary" htmlFor="">
            Password:
          </label>
          <input
            className="form-control mb-2"
            value={password}
            onChange={(e) => setPassWord(e.target.value)}
            type="password"
            placeholder="Enter Password"
          />

          <div className="mt-3">
            <span>Don't have an account? </span>
            <a
              href="/register"
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              Register
            </a>
          </div>
        </div>

        <button className="btn btn-warning w-100 mt-2" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
