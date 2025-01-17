import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useGoToDirection } from "../utils";
import { ProductsContext } from "../contexts/ProductContext";
import ProductForm from "./ProductForm";

const UpdateProduct = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const handleGoToProducts = useGoToDirection("/products");
  const { setProducts } = useContext(ProductsContext);

  const [message, setMessage] = useState("");
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleSave = async () => {
    if (!updatedProduct.id) return;

    try {
      const response = await fetch(
        `http://localhost:4000/products/${updatedProduct.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProduct),
        }
      );
      const data = await response.json();

      if (data) {
        setMessage(
          "Updated successfully. You will be redirected to the products page in a second."
        );
        setProducts(data)
        setTimeout(() => {
          handleGoToProducts();
        }, 1000);
      }
    } catch (error) {
      console.error("Error updating product:", error);
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
