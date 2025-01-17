 
import React from "react";

const ProductForm = ({ product, setProduct, handleSubmit, buttonText }) => {
  const handlePartChange = (partName, option) => {
    const optionsArray = option.split(",").map((opt) => opt.trim());
    setProduct((prev) => ({
      ...prev,
      parts: prev.parts.map((part) =>
        part.partName === partName
          ? { ...part, options: optionsArray.map((opt) => ({ option: opt, stock: 1 })) }
          : part
      ),
    }));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={product.description}
        onChange={(e) => setProduct({ ...product, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
      />
      {product.parts.map((part) => (
        <div key={part.partName}>
          <h4>{part.partName}</h4>
          <input
            type="text"
            value={part.options.map((opt) => opt.option).join(", ")}
            placeholder="Options"
            onChange={(e) => handlePartChange(part.partName, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleSubmit}>{buttonText}</button>
    </div>
  );
};

export default ProductForm;