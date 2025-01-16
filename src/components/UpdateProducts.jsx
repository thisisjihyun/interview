import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import { useGoToDirection } from "../utils";
import { ProductsContext } from "../contexts/ProductContext";

const UpdateProduct = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const handleGoToProducts = useGoToDirection("/products");
  const { setProducts } = useContext(ProductsContext);

  const [message, setMessage] = useState("");
  const [updatedProducts, setUpdatedProducts] = useState(product);

  const handleInputChange = (partName, option, field, value) => {
    setUpdatedProducts((prev) => {
      const updatedParts = prev.parts.map((part) => {
        if (part.partName === partName) {
          const updatedOptions = part.options.map((opt) => {
            if (opt.option === option) {
              return { ...opt, [field]: value };
            }
            return opt;
          });
          return { ...part, options: updatedOptions };
        }
        return part;
      });

      return { ...prev, parts: updatedParts };
    });
  };

  const handleNameChange = (e, field) => {
    setUpdatedProducts({ ...updatedProducts, [field]: e.target.value });
  };

  const handleSave = async () => {
    if (!updatedProducts.id) return;

    try {
      const response = await fetch(
        `http://localhost:4000/products/${updatedProducts.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProducts),
        }
      );
      const data = await response.json();

      if (data) {
        setMessage(
          "Updated successfully. It will be redirected to the products page in 3 seconds."
        );
        setProducts(data)
        setTimeout(() => {
          handleGoToProducts();
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating a product:", error);
    }
  };

  if (!updatedProducts) {
    return <div>Not matched product ...</div>;
  }

  return (
    <div>
      <h1>Update Bicycle Options</h1>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={updatedProducts.name}
          onChange={(e) => handleNameChange(e, "name")}
        />
        <label>Description:</label>
        <input
          type="text"
          value={updatedProducts.description}
          onChange={(e) => handleNameChange(e, "description")}
        />
        <label>Price:</label>
        <input
          type="number"
          value={updatedProducts.price}
          onChange={(e) => handleNameChange(e, "price")}
        />

        {updatedProducts?.parts?.map((part) => (
          <div key={part.partName}>
            <h3>{part.partName}</h3>
            {part.options.map((option) => (
              <div key={option.option}>
                <div>
                  <label>Option Name:</label>
                  <input
                    type="text"
                    value={option.option}
                    onChange={(e) =>
                      handleInputChange(
                        part.partName,
                        option.option,
                        "option",
                        e.target.value
                      )
                    }
                    placeholder="Option Name"
                  />
                </div>
                <div>
                  <label>Stock:</label>
                  <input
                    type="number"
                    value={option.stock}
                    onChange={(e) =>
                      handleInputChange(
                        part.partName,
                        option.option,
                        "stock",
                        Number(e.target.value)
                      )
                    }
                    placeholder="Stock"
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <p style={{ color: "green" }}>{message ? `${message}` : ""}</p>
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default UpdateProduct;
