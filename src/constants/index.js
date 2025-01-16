export const displayNames = {
  frameType: "Frame Type",
  frameFinish: "Frame Finish",
  wheels: "Wheels",
  rimColor: "Rim Color",
  chain: "Chain",
};


export const prohibitedCombinations = [
  {
    condition: { wheels: "Mountain wheels" },
    restrict: { frameType: ["Diamond", "Step-through"] },
  },
  { condition: { wheels: "Fat bike wheels" }, restrict: { rimColor: ["Red"] } },
  {
    condition: { frameType: "Diamond" },
    restrict: { wheels: ["Mountain wheels"] },
  },
  {
    condition: { frameType: "Step-through" },
    restrict: { wheels: ["Mountain wheels"] },
  },
  { condition: { rimColor: "Red" }, restrict: { wheels: ["Fat bike wheels"] } },
];