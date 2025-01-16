const products = require("../data");

const getProducts = (req, res) => {
  const { type } = req.query;
  const filteredProducts = type
    ? products.filter((product) => product.type === type)
    : products;
  res.status(200).json(filteredProducts);
};

const addProduct = (req, res) => {
  const { name, description, type, price, parts } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    description,
    type,
    price,
    parts,
  };
  products.push(newProduct);
  res.status(201).json(products);
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, price, parts } = req.body;
  const productIndex = products.findIndex(
    (product) => product.id === parseInt(id)
  );
  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  products[productIndex] = {
    ...products[productIndex],
    name,
    description,
    price,
    parts,
  };
  res.status(200).json(products);
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex(
    (product) => product.id === parseInt(id)
  );
  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  products.splice(productIndex, 1);
  res.status(200).json(products);

};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
