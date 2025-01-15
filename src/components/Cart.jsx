import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../Context";

export const Cart = () => {
  // TODO - mention that it can be duplicated as they might want to add the same thing for different qunatity
  /* TODO - EDIT / DELETE */
  /* PRESERVE THE ITEM AFTER REFRESH */
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/cart");
  };

  // TODO - Utils
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <h3>Your Cart</h3>
      <button onClick={handleGoBack}>Go back</button>
      <button onClick={handleClick}>Go to My Cart</button>
      <button onClick={removeFromCart}>Clear Cart</button>
      <ul>
        {cart?.length > 0 ? (
          cart?.map((item, index) => {
            const {
              name,
              selectedOptions: {
                chain,
                frameType,
                frameFinish,
                rimColor,
                wheels,
              } = {},
            } = item;
            return (
              <li key={index}>
                {name} - {frameType}, {frameFinish}, {wheels}, {rimColor},{" "}
                {chain}
              </li>
            );
          })
        ) : (
          <p>Your cart is empty.</p>
        )}
      </ul>
    </>
  );
};
