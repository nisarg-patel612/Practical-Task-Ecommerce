import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format";

    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (touched[name]) {
      const updatedErrors = { ...errors };

      if (name === "email") {
        if (value.trim())
          delete updatedErrors.email;
      }

      if (name === "password") {
        if (value.trim().length >= 6) delete updatedErrors.password;
      }

      setErrors(updatedErrors);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    setTouched({ email: true, password: true });

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login Successful!");
      setIsLoggedIn(true);
      navigate("/home");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <form
        className="login-form shadow-lg p-5 rounded mt-5"
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="Amazon Logo"
            style={{ height: "30px" }}
          />
          <span style={{ fontSize: "16px", marginLeft: "2px" }}>.in</span>
        </div>
        <h3 className="text-center mb-4">Login Account</h3>

        <div className="form-group mb-3">
          <label>Email address</label>
          <input
            type="email"
            className={`form-control ${
              touched.email && errors.email ? "is-invalid" : ""
            }`}
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <div className="form-group mb-4">
          <label>Password</label>
          <input
            type="password"
            className={`form-control ${
              touched.password && errors.password ? "is-invalid" : ""
            }`}
            name="password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>

        <ToastContainer position="top-right" autoClose={3000} />
      </form>
    </div>
  );
};

export default Login;
