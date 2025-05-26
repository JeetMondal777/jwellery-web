import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import Registration from './pages/Registration';
import Log from './pages/Log';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import ProdDetails from './pages/components/ProdDetails';
import ProfilePanel from './pages/components/ProfilePanel';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';

const App = ({ children }) => {
  return (
    <>
      {/* Global Toast Notifications Centered */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            margin: 'auto',
          },
        }}
      />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/log' element={<Log />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/products' element={<ProductPage />} />
        <Route path='/prod' element={<ProdDetails />} />
        <Route path='/profile' element={<ProfilePanel />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/wish' element={<WishlistPage />} />
        <Route path='/order' element={<OrderPage />} />
      </Routes>

      {children}
    </>
  );
};

export default App;
