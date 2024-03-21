import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductList from "./components/ProductList";
import Header from "./shared/Header";
import ProductForm from "./components/ProductForm";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/" element={<Login />} />
        <Route path="/create-product" element={<ProductForm />} />
        <Route path="/edit-product" element={<ProductForm />} />
      </Routes>
    </Router>
  );
}

export default App;
