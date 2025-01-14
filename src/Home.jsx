import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Cart } from "./Cart";
// Todo - write unit test

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

  return (
    <div>
      <h1>Marcus's Bicycle Shop</h1>
      <Cart />

      <h2>Bicycles for Sale</h2>
      <ul>
        {bicycles.map((bike) => (
          <li key={bike.id}>
            <h3>{bike.name}</h3>
            <p>Frame Options: {bike.frameType.join(", ")}</p>
            <p>Wheels: {bike.wheels.join(", ")}</p>
            <p>Rims: {bike.rims.join(", ")}</p>
            <button onClick={() => handleSeeMore(bike)}>See More</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
