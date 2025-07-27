import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.role.trim()) newErrors.role = "Role is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      if (res.status === 201) {
        toast.success(`${formData.role} created successfully`, {
          position: "top-center",
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/");
        }, 2500);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Something went wrong during registration";
      toast.error(msg, {
        position: "top-center",
        autoClose: 3000,
      });
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

        <h5 className="fw-bold mb-3">Admin / Vendor Register</h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label fw-bold">Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          <div className="mb-2">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="mb-2">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <div className="mb-2">
            <label className="form-label fw-bold">Role</label>
            <select
              className={`form-select ${errors.role ? "is-invalid" : ""}`}
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">-- Select Role --</option>
              <option value="Admin">Admin</option>
              <option value="Vendor">Vendor</option>
            </select>
            {errors.role && (
              <div className="invalid-feedback">{errors.role}</div>
            )}
          </div>

          <button className="btn btn-warning w-100 mt-2" type="submit">
            Register
          </button>
        </form>

        <p className="mt-3 mb-1" style={{ fontSize: "12px" }}>
          Already have an account?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Login here
          </span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
