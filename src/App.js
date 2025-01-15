import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { Details } from "./Details";
import { Cart } from "./Cart";
import ManageProducts from "./ManageProducts";
import { CartProvider } from "./Context";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path="/products" element={<ManageProducts />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
