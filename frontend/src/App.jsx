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
import AboutPage from './pages/AboutPage';

const App = ({ children }) => {
  return (
    <>
      {/* Global Toast Notifications at Bottom Right */}
      <Toaster
        position="bottom-right"
        reverseOrder={false}
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
        <Route path='/about' element={<AboutPage />} />
      </Routes>

      {children}
    </>
  );
};

export default App;
