import api from "./api";
import { authHeader } from "../helpers/auth-header";

const getAllProducts = () => {
  return api.get("/products", { headers: authHeader() });
};

const getProductById = (id) => {
  return api.get(`/products/${id}`, { headers: authHeader() });
};

const createProduct = (name, price) => {
  price = parseFloat(price);
  return api.post(
    "/products/admin/post",
    { name, price },
    { headers: authHeader() }
  );
};

const updateProduct = (id, name, price) => {
  price = parseFloat(price);
  return api.put("/products", { id, name, price }, { headers: authHeader() });
};

const deleteProduct = (product) => {
  return api.delete(`/products/${product}`, { headers: authHeader() });
};

export const productService = {
  getAllProducts,
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
};
