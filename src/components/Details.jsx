import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { CartContext } from "../Context";
import { Cart } from "./Cart";

export const Details = () => {
  const { state } = useLocation();
  const [selectedOptions, setSelectedOptions] = useState({});
  const { addToCart } = useContext(CartContext);
  const bike = state?.bike;
  const [message, setMessage] = useState("");

  const handleOptionChange = (partName, option) => {
    if (
      option === "Mountain wheels" ||
      option === "Fat bike wheels" ||
      option === "Diamond" ||
      option === "Step-through"
    ) {
      setMessage(
        "Some options are currently unavailable. We apologize for the inconvenience."
      );
    } else {
      setMessage("");
    }
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [partName]: option,
    }));
  };

  const handleAddToCart = () => {
    addToCart({ name: bike.name, selectedOptions });
  };

  if (!bike) return <div>Loading...</div>;

  const selectBackgroundColor = (part, option) =>
    selectedOptions[part.partName] === option.option
      ? "lightgreen"
      : "transparent";

  // TODO - VALIDATION WHEN OPTION IS NOT SELECTED
  // TODO - When cart is added -> didn't change the inventory number * mention
  // TODO - displayed name check
  const checkProhibitedCombination = (part, option) => {
    const { wheels, rimColor, frameType } = selectedOptions;

    if (
      wheels === "Mountain wheels" &&
      part.partName === "frameType" &&
      option.option !== "Full-suspension"
    ) {
      return true;
    }

    if (
      frameType === "Diamond" &&
      part.partName === "wheels" &&
      option.option === "Mountain wheels"
    ) {
      return true;
    }

    if (
      frameType === "Step-through" &&
      part.partName === "wheels" &&
      option.option === "Mountain wheels"
    ) {
      return true;
    }

    if (
      wheels === "Fat bike wheels" &&
      part.partName === "rimColor" &&
      option.option === "Red"
    ) {
      return true;
    }

    if (
      rimColor === "Red" &&
      part.partName === "wheels" &&
      option.option === "Fat bike wheels"
    ) {
      return true;
    }

    return false;
  };
  return (
    <div>
      <Cart />

      <h1>Customise as you want - {bike.name}</h1>
      <h3>Price : £{bike.price}</h3>
      <h3>{bike.description}</h3>

      {bike.parts?.map((part) => (
        <div key={part.partName}>
          <h4>{part.partName}</h4>
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
                  // check updateProducts
                  Number(option.stock) === 0 ||
                  checkProhibitedCombination(part, option)
                }
              >
                {option.option} - {option.stock} in stock
              </button>
            ))}
          </div>
        </div>
      ))}
      <p style={{ color: "red" }}>{message}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};
