import axios from "axios";

const BASE_URL = "http://localhost:4000/products";

export const getProducts = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post(BASE_URL, product, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await axios.put(`${BASE_URL}/${id}`, product, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};