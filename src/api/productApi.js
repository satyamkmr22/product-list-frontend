import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const getProducts = () => api.get('/products');
export const addProduct = (product) => api.post('/products', product);
export const updateProduct = (id, product) => api.put(`/products/${id}`, product);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
