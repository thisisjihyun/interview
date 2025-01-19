import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CartProvider } from "./contexts/CartContext";
import { ProductsProvider } from "./contexts/ProductContext";

import { Home } from "./components/Home";
import { Details } from "./components/Details";
import { Cart } from "./components/Cart";
import { ManageProducts } from "./components/ManageProducts";
import UpdateProduct from "./components/UpdateProduct";

const App = () => {
  return (
    <CartProvider>
      <ProductsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/manage" element={<ManageProducts />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
          </Routes>
        </Router>
      </ProductsProvider>
    </CartProvider>
  );
};

export default App;
