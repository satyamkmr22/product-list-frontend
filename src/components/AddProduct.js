import React, { useState, useEffect } from 'react';
import { addProduct, updateProduct } from '../api/productApi';
import '../css/AddProduct.css';

function AddProduct({ editingProduct, onEditComplete }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setDescription(editingProduct.description);
      setPrice(editingProduct.price);
      setQuantity(editingProduct.quantity);
    }
  }, [editingProduct]);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!description) newErrors.description = 'Description is required';
    if (!price || price <= 0) newErrors.price = 'Price must be a positive number';
    if (!quantity || quantity < 0) newErrors.quantity = 'Quantity cannot be negative';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const product = { name, description, price, quantity };

    if (editingProduct) {
      updateProduct(editingProduct.id, product)
        .then(onEditComplete)
        .catch(error => console.error('Error updating product:', error));
    } else {
      addProduct(product)
        .then(onEditComplete)
        .catch(error => console.error('Error adding product:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
        {errors.description && <p className="error">{errors.description}</p>}
      </div>
      <div>
        <label>Price</label>
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
        {errors.price && <p className="error">{errors.price}</p>}
      </div>
      <div>
        <label>Quantity</label>
        <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
        {errors.quantity && <p className="error">{errors.quantity}</p>}
      </div>
      <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
    </form>
  );
}

export default AddProduct;
