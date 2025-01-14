import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Cart } from "./Cart";
import { CartContext } from "./Context";

export const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [disable, setDisable] = useState(false);
  const { addToCart } = useContext(CartContext);

  const {
    bike: { name, chain, frameFinish, frameType, rims, stock, wheels } = {},
  } = location?.state;

  const [selectedOptions, setSelectedOptions] = useState({
    name,
    frameType: frameType[0],
    frameFinish: frameFinish[0],
    wheels: wheels[0],
    rims: rims[0],
    chain: chain[0],
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleOptions = (options, key) => {
    return (
      <select
        value={selectedOptions[key]}
        onChange={(e) => handleSelectionChange(key, e.target.value)}
      >
        {options?.map((option) => (
          <option option={option}>{option}</option>
        ))}
      </select>
    );
  };

  const handleSelectionChange = (key, value) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <>
      <button onClick={handleGoBack}>Go back</button>
      <Cart />

      <h3>{name} Options</h3>
      <p>Customise your bike as you want</p>
      <p>Frame Type: {handleOptions(frameType, "frameType")}</p>
      <p>Frame Finish: {handleOptions(frameFinish, "frameFinish")}</p>
      <p>Wheels: {handleOptions(wheels, "wheels")}</p>
      <p>Rim Colour: {handleOptions(rims, "rims")}</p>
      <p>Chain: {handleOptions(chain, "chain")}</p>
      <p>Stock: {stock ? "available" : "temporarily unavailible"}</p>
      <p style={{ color: "red" }}>{message ? message : null}</p>
      {console.log("here ms", message)}
      <h3>Details - please double check the options you choose</h3>
      <p>Frame Type : {selectedOptions.frameType}</p>
      <p>Frame Finish : {selectedOptions.frameFinish}</p>
      <p>Wheels : {selectedOptions.wheels}</p>
      <p>Rim Colour : {selectedOptions.rims}</p>
      <p>Chain : {selectedOptions.chain}</p>
      <button onClick={() => addToCart(selectedOptions)}>Add to Cart</button>
    </>
  );
};
