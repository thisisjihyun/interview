import React, { useContext } from "react";

import { useGoToDirection } from "../utils";
import { CartContext } from "../contexts/CartContext";

export const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const handleGoBack = useGoToDirection(-1);
  const handleGoToCart = useGoToDirection("/cart");

  const displayCart =
    cart?.length > 0 ? (
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
            {name} - {frameType}, {frameFinish}, {wheels}, {rimColor}, {chain}
          </li>
        );
      })
    ) : (
      <p>Your cart is empty.</p>
    );

  return (
    <>
      <h3>Your Cart</h3>
      <button onClick={handleGoBack}>Go back</button>
      <button onClick={handleGoToCart}>Go to My Cart</button>
      <button onClick={removeFromCart}>Clear Cart</button>
      <ul>{displayCart}</ul>
    </>
  );
};
