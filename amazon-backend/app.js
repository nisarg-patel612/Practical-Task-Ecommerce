const express = require("express");
const cors = require("cors");
const authRoutes = require("./Routes/AuthRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const vendorRoutes = require("./Routes/vendorRoutes");
const productRoutes = require("./Routes/productRoutes");

const app = express();

// allow both localhost:5173 and localhost: 5174
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/products", productRoutes);

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const userRoutes = require("./Routes/userRoutes");
app.use("/api/user", userRoutes);

module.exports = app;
