import React, { useContext } from "react";

import { CartContext } from "./Context";

export const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  return (
    <>
      <h1>Your Cart</h1>
      <button onClick={removeFromCart}>Clear Cart</button>
      <ul>
        {cart?.length > 0 ? (
          cart?.map((item, index) => {
            const { name, chain, frameType, frameFinish, rims, wheels } = item;
            return (
              <li key={index}>
                {name} - {frameType}, {frameFinish}, {wheels}, {rims}, {chain}
              </li>
            );
          })
        ) : (
          <p>Your cart is empty.</p>
        )}
      </ul>
      {/* TODO - EDIT / DELETE */}
      {/* PRESERVE THE ITEM AFTER REFRESH */}
    </>
  );
};
