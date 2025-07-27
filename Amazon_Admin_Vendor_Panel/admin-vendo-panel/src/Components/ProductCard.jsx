import React from "react";
import { Button } from "react-bootstrap";

const ProductCard = ({ product, onView, onEdit, onDelete }) => {
  const imageUrl = product.image
    ? `http://localhost:5000/uploads/${product.image}`
    : "https://via.placeholder.com/150"; 

  return (
    <div className="card mb-3" style={{ width: "18rem" }}>
      <img src={imageUrl} className="card-img-top" alt={product.title} />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">₹{product.price}</h6>
        <p className="card-text">{product.description.slice(0, 50)}...</p>
        <p>
          <strong>Category:</strong> {product.category}
        </p>

        
        <div className="d-flex justify-content-between">
          <Button variant="info" size="sm" onClick={() => onView(product)}>
            View
          </Button>
          <Button variant="warning" size="sm" onClick={() => onEdit(product)}>
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(product._id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
