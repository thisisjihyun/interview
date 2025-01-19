import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import { useGoToDirection } from "../utils";
import { ProductsContext } from "../contexts/ProductContext";
import ProductForm from "./ProductForm";
import { updateProduct } from "../api/productsApi";

const UpdateProduct = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const handleGoToProducts = useGoToDirection("/manage");
  const { setProducts } = useContext(ProductsContext);

  const [message, setMessage] = useState("");
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleSave = async () => {
    if (!updatedProduct.id) return;

    try {
      const data = await updateProduct(updatedProduct.id, updatedProduct);
      setMessage(
        "Updated successfully. You will be redirected to the products page in a second."
      );
      setProducts(data);
      setTimeout(() => {
        handleGoToProducts();
      }, 1000);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  if (!updatedProduct) {
    return <div>Product not found...</div>;
  }

  return (
    <div>
      <h1>Update Product</h1>
      <ProductForm
        product={updatedProduct}
        setProduct={setUpdatedProduct}
        handleSubmit={handleSave}
        buttonText="Save Changes"
      />
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};

export default UpdateProduct;
