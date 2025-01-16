module.exports = [
  {
    id: 1,
    name: "Bike 1",
    description: "Best selling bike in the shop",
    price: 500,
    parts: [
      {
        partName: "frameType",
        options: [
          { option: "Full-suspension", stock: 5 },
          { option: "Diamond", stock: 5 },
          { option: "Step-through", stock: 1 },
        ],
      },
      {
        partName: "frameFinish",
        options: [
          { option: "Matte", stock: 4 },
          { option: "Shiny", stock: 2 },
        ],
      },
      {
        partName: "wheels",
        options: [
          { option: "Road wheels", stock: 8 },
          { option: "Mountain wheels", stock: 4 },
          { option: "Fat bike wheels", stock: 2 },
        ],
      },
      {
        partName: "rimColor",
        options: [
          { option: "Red", stock: 5 },
          { option: "Blue", stock: 2 },
          { option: "Black", stock: 2 },
        ],
      },
      {
        partName: "chain",
        options: [
          { option: "Single-speed chain", stock: 5 },
          { option: "8-speed chain", stock: 0 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Bike 2",
    description: "Perfect for beginners",
    price: 250,
    parts: [
      {
        partName: "frameType",
        options: [
          { option: "Full-suspension", stock: 3 },
          { option: "Diamond", stock: 1 },
          { option: "Step-through", stock: 1 },
        ],
      },
      {
        partName: "frameFinish",
        options: [
          { option: "Matte", stock: 5 },
          { option: "Shiny", stock: 8 },
        ],
      },
      {
        partName: "wheels",
        options: [
          { option: "Road wheels", stock: 8 },
          { option: "Mountain wheels", stock: 2 },
          { option: "Fat bike wheels", stock: 0 },
        ],
      },
      {
        partName: "rimColor",
        options: [
          { option: "Red", stock: 0 },
          { option: "Blue", stock: 4 },
          { option: "Black", stock: 2 },
        ],
      },
      {
        partName: "chain",
        options: [
          { option: "Single-speed chain", stock: 8 },
          { option: "8-speed chain", stock: 1 },
        ],
      },
    ],
  },
];
