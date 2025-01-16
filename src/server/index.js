const express = require("express");
const cors = require("cors");
const data = require("./data");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/bicycles", (req, res) => {
  res.status(200).json(data);
});

app.post("/api/bicycles", (req, res) => {
  const { name, description, price, parts } = req.body;
  const newBicycle = {
    id: data.length + 1,
    name,
    description,
    price,
    parts,
  };
  data.push(newBicycle);
  res.status(201).json(data);
});

app.put("/api/bicycles/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.findIndex((bike) => bike.id === id);

  if (index === -1) {
    res.status(404).send({ message: "Bicycle not found" });
  } else {
    data[index] = req.body;
    res.status(200).json(data[index]);
  }
});

app.delete("/api/bicycles/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.findIndex((bike) => bike.id === id);

  if (index === -1) {
    res.status(404).send({ message: "Bicycle not found" });
  } else {
    data.splice(index, 1);
    res.status(200).json({
      message: "Bicycle deleted successfully",
      data,
    });
  }
});

module.exports = app;

app.listen(4000, () => {
  console.log(`Server running on http://localhost:4000`);
});
