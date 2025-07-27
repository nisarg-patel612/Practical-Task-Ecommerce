import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import './App.css'; 
import AdminDashboard from "./Pages/AdminDashboard";
import AddVendor from "./Pages/AddVendor";
import ProductManagement from "./Pages/ProductManagement";
import VendorDashboard from "./Pages/VendorDashboard";
import AddProduct from "./Pages/AddProduct";

function App() {

  return (
    <BrowserRouter>

        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/add-vendor" element={<AddVendor />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/products" element={<ProductManagement />} />
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            <Route path="/vendor/products" element={<ProductManagement />} />
        </Routes>
    
    </BrowserRouter>
  )
  
}

export default App
