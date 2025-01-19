export const displayNames = {
  frameType: "Frame Type",
  frameFinish: "Frame Finish",
  wheels: "Wheels",
  rimColor: "Rim Color",
  chain: "Chain",
};

export const unavailableOptions = [
  "Mountain wheels",
  "Fat bike wheels",
  "Diamond",
  "Step-through",
  "Red",
];

export const prohibitedCombinations = [
  {
    when: { wheels: "Mountain wheels" },
    disallow: { frameType: ["Diamond", "Step-through"] },
  },
  { when: { wheels: "Fat bike wheels" }, disallow: { rimColor: ["Red"] } },
  { when: { frameType: "Diamond" }, disallow: { wheels: ["Mountain wheels"] } },
  {
    when: { frameType: "Step-through" },
    disallow: { wheels: ["Mountain wheels"] },
  },
  { when: { rimColor: "Red" }, disallow: { wheels: ["Fat bike wheels"] } },
];

export const newDefaultProduct = {
  name: "",
  description: "",
  price: "",
  parts: [
    {
      partName: "frameType",
      options: [{ option: "", stock: 1 }],
    },
    {
      partName: "frameFinish",
      options: [{ option: "", stock: 1 }],
    },
    {
      partName: "wheels",
      options: [{ option: "", stock: 1 }],
    },
    {
      partName: "rimColor",
      options: [{ option: "", stock: 1 }],
    },
    {
      partName: "chain",
      options: [{ option: "", stock: 1 }],
    },
  ],
};
