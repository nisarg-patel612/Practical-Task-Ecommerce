import React, { useState } from "react";
import API from "../Services/api";

function AddVendor() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [permissions, setPermissions] = useState({
    add: false,
    update: false,
    delete: false,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    const selectedPermissions = Object.keys(permissions).filter(
      (p) => permissions[p]
    );
    if (selectedPermissions.length === 0)
      newErrors.permissions = "At least one permission required";

    return newErrors;
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    if (submitted || touched[field]) {
      const newFieldErrors = { ...errors };

      if (field === "name" && value.trim()) delete newFieldErrors.name;
      if (field === "email") {
        if (value.trim()) delete newFieldErrors.email;
      }
      if (field === "password" && value.length >= 6)
        delete newFieldErrors.password;

      setErrors(newFieldErrors);
    }
  };

  const handlePermissionChange = (key, checked) => {
    const updatedPermissions = { ...permissions, [key]: checked };
    setPermissions(updatedPermissions);

    if (submitted || touched.permissions) {
      const selected = Object.keys(updatedPermissions).filter(
        (p) => updatedPermissions[p]
      );
      if (selected.length > 0) {
        const newErrors = { ...errors };
        delete newErrors.permissions;
        setErrors(newErrors);
      }
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    setTouched({ name: true, email: true, password: true, permissions: true });
    setSubmitted(true);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await API.post("/admin/create-vendor", {
          ...formData,
          permissions: Object.keys(permissions).filter((k) => permissions[k]),
        });
        alert("Vendor Created...!");
        setFormData({ name: "", email: "", password: "" });
        setPermissions({ add: false, update: false, delete: false });
        setErrors({});
        setTouched({});
        setSubmitted(false);
      } catch (err) {
        alert(err.response?.data?.error || "Server error");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow-lg p-4 rounded-4 mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <h3 className="text-center mb-4 text-primary">Create Vendor</h3>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className={`form-control ${
              touched.name && errors.name ? "is-invalid" : ""
            }`}
            placeholder="Enter Name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            onBlur={() => setTouched({ ...touched, name: true })}
          />
          {touched.name && errors.name && (
            <div className="invalid-feedback">{errors.name}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${
              touched.email && errors.email ? "is-invalid" : ""
            }`}
            placeholder="Enter Email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            onBlur={() => setTouched({ ...touched, email: true })}
          />
          {touched.email && errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <div className="mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${
              touched.password && errors.password ? "is-invalid" : ""
            }`}
            placeholder="Enter Password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            onBlur={() => setTouched({ ...touched, password: true })}
          />
          {touched.password && errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        <div className="mb-4">
          <label className="form-label">Permissions</label>
          <div className="d-flex gap-3 flex-wrap">
            {["add", "update", "delete"].map((p) => (
              <div className="form-check" key={p}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={p}
                  checked={permissions[p]}
                  onChange={(e) => handlePermissionChange(p, e.target.checked)}
                />
                <label className="form-check-label text-capitalize" htmlFor={p}>
                  {p}
                </label>
              </div>
            ))}
          </div>
          {submitted && errors.permissions && (
            <div className="text-danger mt-1" style={{ fontSize: "0.875em" }}>
              {errors.permissions}
            </div>
          )}
        </div>

        <div className="d-grid">
          <button className="btn btn-success" onClick={handleSubmit}>
            Create Vendor
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddVendor;
