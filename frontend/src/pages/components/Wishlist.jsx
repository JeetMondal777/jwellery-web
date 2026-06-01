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
                className="group cursor-pointer bg-[#FFFBFA] rounded-[1.75rem] border border-[#F0DFC8] p-3 shadow-md hover:shadow-xl transition-all duration-300 ease-out flex flex-col justify-between"
                onClick={() => {}}
              >
                <div>
                  <div className="relative overflow-hidden bg-[#FDF6EF] rounded-2xl">
                    <img
                      src={imgSrc}
                      alt={product.title}
                      className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-700 ease-out rounded-2xl"
                    />
                    <button
                      onClick={(e) => handleRemoveClick(e, product)}
                      className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-rose-600 hover:bg-rose-50 hover:scale-110 shadow-sm transition-all duration-300 cursor-pointer"
                      title="Remove from wishlist"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>

                  <div className="px-2 pt-4">
                    <span className="text-[10px] font-bold tracking-widest text-[#A67C35] uppercase block mb-1">
                      Wishlisted Item
                    </span>
                    <h3 className="font-['Playfair_Display'] font-semibold text-base md:text-lg text-[#1A1410] tracking-wide leading-tight line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="mt-3 text-lg md:text-xl font-bold text-[#C9954A]">
                      ₹{" "}
                      {typeof product.price === "number"
                        ? product.price.toLocaleString()
                        : "—"}
                    </p>
                  </div>
                </div>

                <div className="px-2 pb-1 mt-5">
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-full py-3 bg-[#1A1410] hover:bg-[#C9954A] text-white font-medium text-xs tracking-widest uppercase rounded-full shadow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FaShoppingCart size={12} />
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
