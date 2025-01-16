import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useGoToDirection } from "../utils";
import { ProductsContext } from "../contexts/ProductContext";

import { Cart } from "./Cart";

export const Home = () => {
  const navigate = useNavigate();
  const { products} = useContext(ProductsContext);
  const handleGoToProducts = useGoToDirection("/products");

  const handleSeeMore = (product) => {
    navigate(`/details`, { state: { product } });
  };

  return (
    <div>
      <h1>Marcus's Bicycle Shop</h1>
      <Cart />
      <button onClick={handleGoToProducts}>Go to Admin page</button>
      <h3>Bicycles for Sale</h3>
      <ul>
        {products?.map((product) => (
          <>
            <li key={product.id}>
              <h3>
                {product.name} - £{product.price} / {product.description}
              </h3>
              {product.parts?.map((part) => {
                return (
                  <>
                    <h4>{part.partName}</h4>
                    {part.options.map((option, index) => {
                      return (
                        <span>
                          {option.option}
                          {part.options.length - 1 === index ? "" : ", "}
                        </span>
                      );
                    })}
                  </>
                );
              })}
            </li>
            <button onClick={() => handleSeeMore(product)}>See More</button>
          </>
        ))}
      </ul>
    </div>
  );
};
