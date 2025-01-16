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
  const updatedProducts = [...products, newProduct];
  res.status(201).json(updatedProducts);
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

  const updatedProducts = products.map((product) =>
    product.id === parseInt(id)
      ? { ...product, name, description, price, parts }
      : product
  );

  res.status(200).json(updatedProducts);
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex(
    (product) => product.id === parseInt(id)
  );

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const updatedProducts = products.filter(
    (product) => product.id !== parseInt(id)
  );

  res.status(200).json(updatedProducts);
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
