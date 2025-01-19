import React from "react";
import { displayNames } from "../constants/index";

const ProductForm = ({ product, setProduct, handleSubmit, buttonText }) => {
  const handlePartChange = (partName, value, field, index) => {
    setProduct((prev) => ({
      ...prev,
      parts: prev.parts.map((part) =>
        part.partName === partName
          ? {
              ...part,
              options: part.options.map((opt, i) =>
                i === index ? { ...opt, [field]: value } : opt
              ),
            }
          : part
      ),
    }));
  };

  const handleAddOption = (partName) => {
    setProduct((prev) => ({
      ...prev,
      parts: prev.parts.map((part) =>
        part.partName === partName
          ? {
              ...part,
              options: [...part.options, { option: "", stock: 1 }],
            }
          : part
      ),
    }));
  };

  const handleRemoveOption = (partName, index) => {
    setProduct((prev) => ({
      ...prev,
      parts: prev.parts.map((part) =>
        part.partName === partName
          ? {
              ...part,
              options: part.options.filter((_, i) => i !== index),
            }
          : part
      ),
    }));
  };

  return (
    <div>
      <label>Name: </label>
      <input
        type="text"
        placeholder="Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <label>Description: </label>
      <input
        type="text"
        placeholder="Description"
        value={product.description}
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
      />
      <label>Price: </label>
      <input
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
      />
      {product.parts.map((part) => (
        <div key={part.partName}>
          <h4>{displayNames[part.partName]}</h4>
          {part.options.map((opt, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                value={opt.option}
                placeholder="Option Name"
                onChange={(e) =>
                  handlePartChange(
                    part.partName,
                    e.target.value,
                    "option",
                    index
                  )
                }
              />
              <input
                type="number"
                value={opt.stock}
                placeholder="Stock"
                onChange={(e) =>
                  handlePartChange(
                    part.partName,
                    e.target.value,
                    "stock",
                    index
                  )
                }
              />
              <button
                type="button"
                onClick={() => handleRemoveOption(part.partName, index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddOption(part.partName)}>
            Add Option
          </button>
        </div>
      ))}
      <button onClick={handleSubmit}>{buttonText}</button>
    </div>
  );
};

export default ProductForm;
