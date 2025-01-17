import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ProductsContext } from "../contexts/ProductContext";
import { displayNames } from "../constants";
import ProductForm from "./ProductForm";

export const ManageProducts = () => {
  const navigate = useNavigate();
  const { products, setProducts } = useContext(ProductsContext);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    parts: [
      {
        partName: "frameType",
        options: [],
      },
      {
        partName: "frameFinish",
        options: [],
      },
      {
        partName: "wheels",
        options: [],
      },
      {
        partName: "rimColor",
        options: [],
      },
      {
        partName: "chain",
        options: [],
      },
    ],
  });

  const handleCreate = async () => {
    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.price ||
      newProduct.parts.some(
        (part) => part.options.length === 0 || part.options[0]?.option === ""
      )
    ) {
      return alert("Please fill in all fields");
    }

    try {
      const response = await fetch("http://localhost:4000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleEdit = (product) =>
    navigate(`/updateProduct`, { state: { product } });

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/products/${id}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Failed to delete the product");
      }
    } catch (error) {
      console.error("Error deleting a product:", error);
    }
  };

  return (
    <div>
      <h1>Bicycle Stock Management</h1>
      <div>
        <h2>Add New Bicycle</h2>
        <ProductForm
          product={newProduct}
          setProduct={setNewProduct}
          handleSubmit={handleCreate}
          buttonText="Add Bicycle"
        />
      </div>

      <div>
        <h2>Bicycle List</h2>
        {products?.map((product, index) => (
          <div key={index}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <div>
              {product?.parts?.map((part, partIndex) => (
                <div key={partIndex}>
                  <h4>{displayNames[part.partName]}</h4>
                  <ul>
                    {part.options?.map((option, optionIndex) => (
                      <li key={optionIndex}>
                        {option.option} - Stock: {option.stock}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};
