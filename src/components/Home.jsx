import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useGoToDirection } from "../utils";
import { ProductsContext } from "../contexts/ProductContext";
import { Cart } from "./Cart";

export const Home = () => {
  const navigate = useNavigate();
  const { products } = useContext(ProductsContext);
  const handleGoToProducts = useGoToDirection("/manage");

  const handleSeeMore = (product) => {
    navigate(`/details/${product.id}`, { state: { product } });
  };

  return (
    <div>
      <h1>Marcus's Bicycle Shop</h1>
      <Cart />
      <button onClick={handleGoToProducts}>Go to Admin page</button>
      <h3>Bicycles for Sale</h3>
      <ul>
        {products?.map((product) => (
          <li key={product.id}>
            <h3>
              {product.name} - £{product.price} / {product.description}
            </h3>
            {product.parts?.map(({ partName, options }) => (
              <div key={partName}>
                <h4>{partName}</h4>
                {options.map(({ option }, index) => (
                  <span key={index}>
                    {option}
                    {options.length - 1 === index ? "" : ", "}
                  </span>
                ))}
              </div>
            ))}
            <button onClick={() => handleSeeMore(product)}>See More</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
