import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import { Cart } from "./Cart";
import { CartContext } from "../contexts/CartContext";
import {
  displayNames,
  prohibitedCombinations,
  unavailableOptions,
} from "../constants";

export const Details = () => {
  const { state } = useLocation();
  const [message, setMessage] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({});
  const { addToCart } = useContext(CartContext);
  const product = state?.product;

  const selectBackgroundColor = (part, option) =>
    selectedOptions[part.partName] === option.option
      ? "lightgreen"
      : "transparent";

  // Check prohibited combinations and display a warning message
  const handleOptionChange = (partName, option) => {
    if (unavailableOptions.includes(option)) {
      setMessage(
        "Some options are currently unavailable. We apologize for the inconvenience."
      );
    } else {
      setMessage("");
    }
    setSelectedOptions((prev) => ({ ...prev, [partName]: option }));
  };

  const validateSelectedOptions =
    Object.keys(selectedOptions).length === 0 ||
    Object.keys(selectedOptions).length < 5;

  // Validate all the options are checked before adding to cart
  const handleAddToCart = () => {
    if (validateSelectedOptions) {
      setMessage("Please select an option for each part");
    } else {
      addToCart({ name: product.name, selectedOptions });
    }
  };

  const isProhibitedCombination = (partName, option, selectedOptions) => {
    // Check if selected options value is matched when
    return prohibitedCombinations.some(({ when, disallow }) => {
      const conditionMet = Object.entries(when).every(
        ([key, value]) => selectedOptions[key] === value
      );

      // Check if the current partName is matched to 'disallow' options
      const isRestricted = disallow[partName]?.includes(option);

      // Return true if both the condition is met
      return conditionMet && isRestricted;
    });
  };

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <Cart />
      <h1>Customise as you want - {product.name}</h1>
      <h3>Price : £{product.price}</h3>
      <h3>{product.description}</h3>

      {product.parts?.map((part) => (
        <div key={part.partName}>
          <h4>{displayNames[part.partName]}</h4>
          <div>
            {part.options?.map((option, index) => (
              <button
                key={index}
                onClick={(e) =>
                  handleOptionChange(part.partName, option.option)
                }
                style={{
                  backgroundColor: selectBackgroundColor(part, option),
                }}
                disabled={
                  option.stock === 0 ||
                  isProhibitedCombination(
                    part.partName,
                    option.option,
                    selectedOptions
                  )
                }
              >
                {option.option} -{" "}
                {option.stock !== 0
                  ? `${option.stock} in stock`
                  : "Out of stock temporarily"}
              </button>
            ))}
          </div>
        </div>
      ))}
      <p style={{ color: "red" }}>{message}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </>
  );
};
