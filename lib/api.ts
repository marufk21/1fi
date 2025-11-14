import axios from "axios";
import type { Product } from "@/types/product";

const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get<{ products: Product[] }>("/products");
  return response.data.products;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await apiClient.get<Product>(`/products/${id}`);
  return response.data;
};
