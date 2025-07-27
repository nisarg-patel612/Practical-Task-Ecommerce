import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = () => {
  const fileInputRef = useRef();

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProductData({ ...productData, image: files[0] });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", productData.title);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("category", productData.category);
      formData.append("image", productData.image);

      await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product added successfully!");
      setProductData({
        title: "",
        description: "",
        price: "",
        category: "",
        image: null,
      });
      fileInputRef.current.value = "";
    } catch (error) {
      toast.error("Failed to add product.");
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} className="row g-3 mt-2">
        <div className="col-md-6">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={productData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="form-control"
            rows="3"
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Category</label>
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Wooden">Wooden</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="form-control"
            accept="image/*"
            ref={fileInputRef}
            required
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
