import React, { useState } from 'react';
import Navbar from './components/Nav';
import Footer from './components/Footer';
import Cart from './components/Cart';
import DeliveryModal from './components/DeliveryModal';

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [refresh, setRefresh] = useState(false);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setRefresh(prev => !prev);
  };

  return (
    <div className="mt-[-80px] min-h-screen">
      <Navbar />
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