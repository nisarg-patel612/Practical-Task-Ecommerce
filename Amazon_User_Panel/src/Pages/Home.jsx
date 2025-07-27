import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Home = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = name
    ? products.filter((p) => p.category === name)
    : products;

  return (
    <div className="container mt-4">
      <img
        src="/Amazon_Banner.jpg"
        alt="Hero"
        className="hero-img mb-4 w-100"
      />
      <h2 className="text-center mb-4">{name || "All"} Products</h2>

      <table className="table table-striped table-bordered product-table">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price (₹)</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p._id}>
              <td>
                <img
                  src={`http://localhost:5000/uploads/${p.image}`}
                  alt={p.title}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>
              <td>{p.title}</td>
              <td>{p.category}</td>
              <td>{p.price}</td>
              <td>{p.description?.slice(0, 50)}...</td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer className="footer mt-5">
        © {new Date().getFullYear()} Amazon.in Clone - Built by Nisarg Patel
      </footer>
    </div>
  );
};

export default Home;
