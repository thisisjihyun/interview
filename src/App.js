import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [bicycles, setBicycles] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/bicycles')
      .then((response) => setBicycles(response.data))
      .catch((error) => console.error('Error fetching bicycles:', error));
  }, []);

  const addToCart = (bike) => {
    setCart((prevCart) => [...prevCart, bike]);
  };

  return (
    <div>
      <h1>Bicycle Shop</h1>
      <h2>Bicycles for Sale</h2>
      <ul>
        {bicycles.map((bike) => (
          <li key={bike.id}>
            <h3>{bike.name}</h3>
            <p>Frame Options: {bike.frame.join(', ')}</p>
            <p>Wheels: {bike.wheels.join(', ')}</p>
            <p>Rims: {bike.rims.join(', ')}</p>
            <button onClick={() => addToCart(bike)}>Add to Cart</button>
          </li>
        ))}
      </ul>

      <h2>My Cart</h2>
      <ul>
        {cart.map((bike, index) => (
          <li key={index}>
            {bike.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;