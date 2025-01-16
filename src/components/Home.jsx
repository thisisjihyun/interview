import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Cart } from "./Cart";

export const Home = () => {
  const [bicycles, setBicycles] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/bicycles")
      .then((response) => setBicycles(response.data))
      .catch((error) => console.error("Error fetching bicycles:", error));
  }, []);

  const handleSeeMore = (bike) => {
    navigate(`/details`, { state: { bike } });
  };

  const navigateAdmin = () => {
    navigate(`/products`, {});
  };

  return (
    <div>
      <h1>Marcus's Bicycle Shop</h1>
      <Cart />
      <button onClick={navigateAdmin}>Go to Admin page</button>
      <h3>Bicycles for Sale</h3>
      <ul>
        {bicycles?.map((bike) => (
          <>
            <li key={bike.id}>
              <h3>
                {bike.name} - £{bike.price} / {bike.description}
              </h3>
              {bike.parts.map((part) => {
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
            <button onClick={() => handleSeeMore(bike)}>See More</button>
          </>
        ))}
      </ul>
    </div>
  );
};
