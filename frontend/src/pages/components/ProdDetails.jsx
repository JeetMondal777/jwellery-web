import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { AiOutlineClose } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';
import necklace from '../../assets/images/NecklaceMain.png';
import useCartStore from '../../store/cart.store';
import toast from 'react-hot-toast';

export default function ProdDetails({
  imageSrc,
  title,
  price,
  reviews,
  reviewCount,
  description,
  onAddToWishlist,
  onAddToCart,
  onClose,
}) {
  const [isVisible, setIsVisible] = useState(true);
  const fullStars = Math.floor(reviews);
  const halfStar = reviews % 1 >= 0.5;

  const addToCart = useCartStore((s) => s.addToCart)
  

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-full-${i}`} className="w-5 h-5 text-yellow-500" />);
    }
    if (halfStar) stars.push(<Star key="star-half" className="w-5 h-5 text-yellow-500 opacity-50" />);
    return stars;
  };

  const handleClose = () => setIsVisible(false);

  const product ={
    title,
    price,
    imgLink:imageSrc,

  }
  

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    console.log(product);
    
    addToCart(product)
  };

  const handleAddToWishlist = (e) => {
    onAddToWishlist(e);
    setIsVisible(false);
  };

  return (
    <AnimatePresence onExitComplete={onClose}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white w-full max-w-4xl h-full max-h-[70vh] p-6 md:p-8 shadow-2xl rounded-2xl flex flex-col md:flex-row overflow-hidden"
          >
            <button
              onClick={handleClose}
              className="absolute z-999 top-4 right-4 text-gray-500 hover:text-gray-700 transition"
            >
              <AiOutlineClose className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className="w-full md:w-1/2 flex-shrink-0 flex justify-center items-start mb-6 md:mb-0">
              <img
                src={imageSrc}
                alt={title}
                className="object-contain rounded-lg w-full max-w-xs md:max-w-full h-auto sticky top-0"
              />
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 md:pl-8 flex flex-col justify-between overflow-auto">
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold mb-2">{title}</h1>
                <p className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">₹ {price.toLocaleString()}</p>
                <div className="flex items-center mb-4">
                  {renderStars()}
                  <span className="ml-2 text-sm text-gray-500">({reviews})</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                  onClick={handleAddToWishlist}
                  className="w-full sm:w-auto px-4 py-3 bg-gradient-to-r from-rose-300 via-rose-100 to-rose-300 text-rose-600 rounded-xl shadow hover:scale-105 transition"
                >
                  Add to Wishlist
                </button>
                <button
                  onClick={handleAddToCart}
                  className="w-full sm:w-auto px-4 py-3 bg-white border border-gray-200 rounded-xl shadow hover:scale-105 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
