const express = require("express");
const app = express();
const cors = require("cors");
const data = require("./data");

app.use(cors());
app.use(express.json());

// TODO - Change data.data in this file
app.get("/api/bicycles", (req, res) => {
  res.json(data.data);
});

app.post("/api/bicycles", (req, res) => {
  console.log('here 111 ', res)
  const newData = { id: data.data.length + 1, ...req.body };
  data.data.push(newData);
  res.status(201).json(newData);
});

app.delete("/api/bicycles/:id", (req, res) => {
  const { id } = req.params;
  data = data.data.filter((bike) => bike.id !== parseInt(id));
  res.status(204).send();
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
