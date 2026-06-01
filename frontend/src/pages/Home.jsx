import React from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from './components/Nav'
import Hero from './components/Hero'
import NewYear from './components/NewYear'
import World from './components/World'
import Products from './components/Products'
import Service from './components/Service'
import Faq from './components/Faq'
import Footer from './components/Footer'
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
        if (!token) return;
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

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  return (
    <div className="justify-center items-center flex flex-col w-full bg-surface">
      <Nav />
      <Hero />
      <NewYear />
      <World />
      {/* <Products />
      <div className="w-full text-center pb-12 bg-surface">
        <button
          onClick={() => {
            navigate('/products');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-10 py-3.5 bg-on-surface hover:bg-primary text-surface font-label-caps text-label-caps tracking-widest uppercase rounded-lg shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          Explore More
        </button>
      </div> */}
      <Service />
      <Faq />
      <Footer />
    </div>
  );
};

export default Home;