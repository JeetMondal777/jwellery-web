import React, { useState } from 'react';
import Navbar from './components/Nav';
import Footer from './components/Footer';
import Cart from './components/Cart';
import DeliveryModal from './components/DeliveryModal';

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // flip this whenever we want Cart to re-fetch
  const [refresh, setRefresh] = useState(false);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    // trigger Cart to reload
    setRefresh(prev => !prev);
  };

  return (
    <div className="bg-rose-50 min-h-screen mt-[-80px]">
      <Navbar />
      {/* pass refresh flag down to Cart */}
      <Cart onOrderClick={handleOpenModal} refresh={refresh} />
      {isModalOpen && (
        <DeliveryModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
      <Footer />
    </div>
  );
};

export default CartPage;
