import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./Context";
import { Home } from "./components/Home";
import { Details } from "./components/Details";
import { Cart } from "./components/Cart";
import { ManageProducts } from "./components/ManageProducts";
import UpdateProduct from "./components/UpdateProducts";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/details" element={<Details />} />
          <Route path="/products" element={<ManageProducts />} />
          <Route path="/updateProduct" element={<UpdateProduct />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
