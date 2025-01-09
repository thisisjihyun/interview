const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database
let bicycles = [
  {
    id: 1,
    name: 'Mountain Bike',
    frame: ['Full-suspension', 'Diamond'],
    wheels: ['Road wheels', 'Mountain wheels'],
    rims: ['Red', 'Black'],
    stock: true,
  },
];

// Routes
app.get('/api/bicycles', (req, res) => {
  res.json(bicycles);
});

app.post('/api/bicycles', (req, res) => {
  const newBicycle = { id: bicycles.length + 1, ...req.body };
  bicycles.push(newBicycle);
  res.status(201).json(newBicycle);
});

app.delete('/api/bicycles/:id', (req, res) => {
  const { id } = req.params;
  bicycles = bicycles.filter((bike) => bike.id !== parseInt(id));
  res.status(204).send();
});

// Start server
app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});