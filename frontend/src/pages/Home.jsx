import React from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from './components/Nav'
import Hero from './components/Hero'
import { FloatingDockDemo } from './components/FloatingDock'
import World from './components/World'
import Service from './components/Service'
import Footer from './components/Footer'
import Products from './components/Products'
import useWishlistStore from '../store/wishlist.store'
import useCartStore from '../store/cart.store'
import { useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/log');
  }
  const wishlist = useWishlistStore((s) => s.wishlist);
  const setWishlist = useWishlistStore((state) => state.setWishlist);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/wishlist`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setWishlist(res.data);
      } catch (err) {
        console.error('Failed to load wishlist', err);
        toast.error('Error Occured! Log In Again');
      }
    };

    fetchWishlist();
  }, [wishlist]);

    const fetchCart = useCartStore(state => state.fetchCart)
    const cartItems      = useCartStore(state => state.cartItems)
    

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  return (
    <div className="justify-center items-center flex flex-col">
      <Nav />
      <Hero />
      <FloatingDockDemo />
      <World />
      <Service />
      <Products />
      <button
        onClick={() => {
          navigate('/products');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="px-10 animate-gradient cursor-pointer py-3 hover:scale-105 transition-all duration-300 text-xl font-semibold rounded-xl bg-gradient-to-r text-white from-pink-400 to-yellow-600 "
      >
        Explore More
      </button>
      <Footer />
    </div>
  );
};

export default Home;