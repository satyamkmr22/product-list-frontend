import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import LandingPage, { Navbar } from './components/LandingPage';
import '../src/css/App.css';
import ContactPage from './components/ContactPage';

function App() {
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleEditComplete = () => {
    setEditingProduct(null);
    setIsModalOpen(false);
    window.location.reload();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      {/* Navbar component rendered on all pages */}
      <Navbar />

      {/* Apply appContent class only for /products route */}
      <div className={location.pathname === '/products' ? 'appContent' : ''}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={
            <>
              <div className="buttonContainer">
                <button className="addProductButton" onClick={toggleModal}>
                  {isModalOpen ? 'Show Products' : 'Add Product'}
                </button>
              </div>
              <ProductList onEdit={handleEdit} />
              {isModalOpen && (
                <div className="modalOverlay" onClick={toggleModal}>
                  <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                    <button className="closeModal" onClick={toggleModal}>×</button>
                    <AddProduct onEditComplete={handleEditComplete} editingProduct={editingProduct} />
                  </div>
                </div>
              )}
            </>
          } />
        <Route path="/contact" element={<ContactPage />} />
        </Routes>

      </div>
    </div>
  );
}

export default App;