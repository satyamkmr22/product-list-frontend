import React from 'react';
import AddProduct from './AddProduct';

const AddProductPage = ({ onEditComplete, editingProduct }) => {
  return (
    <div>
      <h2>Add Product</h2>
      <AddProduct onEditComplete={onEditComplete} editingProduct={editingProduct} />
    </div>
  );
};

export default AddProductPage;
