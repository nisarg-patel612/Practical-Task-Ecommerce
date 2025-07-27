import React, { useEffect, useState } from "react";
import API from "../Services/api";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [role, setRole] = useState("");
  const [vendorId, setVendorId] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedPermissions =
      JSON.parse(localStorage.getItem("permissions")) || [];
    const storedRole = localStorage.getItem("role") || "";
    const storedVendorId = localStorage.getItem("vendorId") || "";

    setPermissions(storedPermissions);
    setRole(storedRole);
    setVendorId(storedVendorId);

    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to fetch products");
    }
  };

  const visibleProducts =
    role === "vendor"
      ? products.filter((p) => p.vendorId === vendorId)
      : products;

  const handleView = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const handleEditOpen = (product) => {
    console.log("Editing Product:", product);
    setEditProduct(product);
    setShowEditModal(true);
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${editProduct._id}`,
        editProduct
      );
      console.log("Product updated:", response.data);
      setShowEditModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await API.delete(`/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Product deleted");
        fetchProducts();
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h3>{role === "vendor" ? "My Products" : "All Products"}</h3>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visibleProducts.map((product) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>{product.category}</td>
              <td>₹{product.price}</td>
              <td>{product.description.slice(0, 40)}...</td>
              <td>
                <Button
                  size="sm"
                  variant="info"
                  onClick={() => handleView(product)}
                >
                  View
                </Button>{" "}
                <Button
                  size="sm"
                  variant="warning"
                  className="mx-1"
                  onClick={() => handleEditOpen(product)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <>
              {selectedProduct.image && (
                <img
                  src={`http://localhost:5000/uploads/${selectedProduct.image}`}
                  alt="product"
                  className="img-fluid mb-3"
                />
              )}
              <p>
                <strong>Title:</strong> {selectedProduct.title}
              </p>
              <p>
                <strong>Category:</strong> {selectedProduct.category}
              </p>
              <p>
                <strong>Price:</strong> ₹{selectedProduct.price}
              </p>
              <p>
                <strong>Description:</strong> {selectedProduct.description}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowViewModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editProduct && (
            <Form>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={editProduct.title}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, title: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editProduct.description}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={editProduct.price}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, price: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  value={editProduct.category}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, category: e.target.value })
                  }
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Wooden">Wooden</option>
                </Form.Control>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductManagement;
