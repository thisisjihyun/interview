const express = require("express");
const cors = require("cors");
const { data } = require("./data");

const app = express();
app.use(cors());
app.use(express.json());

// TODO - Change data.data in this file
app.get("/api/bicycles", (req, res) => {
  res.json(data);
});

app.post("/api/bicycles", (req, res) => {
  const { name, frameType, frameFinish, wheels, rims, chain, stock } = req.body;
  const newBicycle = {
    id: data.length + 1,
    name,
    frameType,
    frameFinish,
    wheels,
    rims,
    chain,
    stock,
  };
  data.push(newBicycle);
  res.status(201).json(newBicycle);
});

app.delete("/api/bicycles/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.findIndex((bike) => bike.id === id);

  if (index === -1) {
    res.status(404).send({ message: "Bicycle not found" });
  } else {
    data.splice(index, 1);
    res.json(data);
  }
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
