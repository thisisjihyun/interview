import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ProductsContext } from "../contexts/ProductContext";
import { displayNames } from "../constants";

export const ManageProducts = () => {
  const navigate = useNavigate();
  const { products, setProducts } = useContext(ProductsContext);
  const [newProducts, setNewProducts] = useState({
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
      !newProducts.name ||
      !newProducts.description ||
      !newProducts.price ||
      newProducts.parts.some(
        (part) => part.options.length === 0 || part.options[0]?.option === ""
      )
    ) {
      return alert("Please fill in all fields");
    }

    const response = await fetch("http://localhost:4000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProducts),
    });
    const data = await response.json();
    setProducts(data);
  };

  const handleEdit = (product) =>
    navigate(`/updateProduct`, { state: { product } });

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/products/${id}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
      } else {
        console.error("Failed to delete the product");
      }
    } catch (error) {
      console.error("Error deleting a product:", error);
    }
  };

  const handlePartChange = (partName, option) => {
    setNewProducts((prev) => ({
      ...prev,
      parts: prev.parts.map((part) =>
        part.partName === partName
          ? { ...part, options: [{ option, stock: 1 }] }
          : part
      ),
    }));
  };

  return (
    <div>
      <h1>Bicycle Stock Management</h1>
      <div>
        <h2>Add New Bicycle</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProducts.name}
          onChange={(e) =>
            setNewProducts({ ...newProducts, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={newProducts.description}
          onChange={(e) =>
            setNewProducts({ ...newProducts, description: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={newProducts.price}
          onChange={(e) =>
            setNewProducts({ ...newProducts, price: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Frame Type"
          value={newProducts.frameType}
          onBlur={(e) => handlePartChange("frameType", e.target.value)}
        />
        <input
          type="text"
          placeholder="Frame Finish"
          value={newProducts.frameFinish}
          onBlur={(e) => handlePartChange("frameFinish", e.target.value)}
        />
        <input
          type="text"
          placeholder="Wheels"
          value={newProducts.wheels}
          onBlur={(e) => handlePartChange("wheels", e.target.value)}
        />
        <input
          type="text"
          placeholder="Rim Color"
          value={newProducts.rimColor}
          onBlur={(e) => handlePartChange("rimColor", e.target.value)}
        />
        <input
          type="text"
          placeholder="Chain"
          value={newProducts.chain}
          onBlur={(e) => handlePartChange("chain", e.target.value)}
        />
        <button onClick={() => handleCreate()}>Add Bicycle</button>
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
