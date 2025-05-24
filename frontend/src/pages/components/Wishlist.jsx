import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import useWishlistStore from '../../store/wishlist.store';
import useCartStore from '../../store/cart.store';

export default function WishlistPage() {
  const { pathname } = useLocation();
  // const [wishlistItems, setWishlistItems] = useState([]);

    const wishlistItems = useWishlistStore((state) => state.wishlist);
    const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
    const isWishlisted = useWishlistStore((state) => state.isWishlisted);
    const addToCart = useCartStore((s) => s.addToCart)


  // useEffect(() => {
  //   const fetchWishlist = async () => {
  //     try {
  //       const token = localStorage.getItem('token');
  //       const res = await axios.get(
  //         `${import.meta.env.VITE_API_URL}/api/users/wishlist`,
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       );
  //       setWishlistItems(res.data); // Expect items with `_id`
  //     } catch (err) {
  //       console.error('Failed to load wishlist', err);
  //       alert('Could not load wishlist');
  //     }
  //   };
  //   fetchWishlist();
  // }, []);

  // Remove an item from wishlist
  const handleRemoveClick = async (e, product) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/users/wishlist/${product._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      removeFromWishlist(product._id);
    } catch (err) {
      console.error('Remove failed', err);
      alert('Could not remove item');
    }
  };

  // Add an item to cart
  const handleAddToCart = async (e, product) => {
    e.stopPropagation();
    addToCart(product)
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-48 py-8">
      <h1 className="text-4xl mb-10 font-semibold text-center">
        Your <span className="text-rose-700">Wishlist</span>
      </h1>
      <hr className="border-t-2 border-rose-500 mb-10" />

      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => {
            const rawImg = product.imglink ?? product.imgLink ?? '';
            const imgSrc =
              typeof rawImg === 'string'
                ? rawImg.replace(/^"|"$/g, '')
                : '';

            return (
              <div
                key={product._id}
                className="cursor-pointer"
                onClick={() => {}}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-md group">
                  <img
                    src={imgSrc}
                    alt={product.title}
                    className="w-full rounded-3xl object-center p-5 h-64 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-2 right-2 text-yellow-400 text-2xl">
                    ❤️
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    {product.title}
                  </h3>
                   <p className="mt-1 text-xl font-bold text-rose-700">
                      ₹{" "}
                      {typeof product.price === "number"
                        ? product.price.toLocaleString()
                        : "—"}
                    </p>

                  <div className="flex justify-center gap-4 mt-3">
                    <button
                      onClick={(e) => handleRemoveClick(e, product)}
                      className="p-2 px-5 cursor-pointer text-rose-600 bg-gradient-to-r from-rose-300 to-yellow-400 hover:scale-105 hover:rounded-2xl transition-all duration-200 rounded"
                    >
                      <FaTrash size={16} />
                    </button>
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="p-2 px-5 cursor-pointer text-emerald-800 bg-gradient-to-r from-yellow-300 to-[#B07F36] hover:scale-105 hover:rounded-2xl transition-all duration-200 rounded"
                    >
                      <FaShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
