import React, { useState } from 'react';
import { Star, X, Heart, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../../store/cart.store';
import toast from 'react-hot-toast';

export default function ProdDetails({
  imageSrc,
  title,
  price,
  reviews,
  karat,
  goldWeight,
  description,
  onAddToWishlist,
  onAddToCart,
  onClose,
}) {
  const [isVisible, setIsVisible] = useState(true);
  const fullStars = Math.floor(reviews);
  const addToCart = useCartStore((s) => s.addToCart);

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < fullStars ? 'text-[#C9954A] fill-[#C9954A]' : 'text-[#E8D5C0]'}`}
        />
      );
    }
    return stars;
  };

  const handleClose = () => setIsVisible(false);

  const product = {
    title,
    price,
    imgLink: imageSrc,
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`Added ${title} to cart`);
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
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white w-full max-w-5xl max-h-[90vh] md:max-h-[85vh] shadow-2xl rounded-[2rem] border border-[#F0DFC8] flex flex-col md:flex-row overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-[#4A3F3A] hover:text-[#1A1410] hover:bg-white hover:scale-110 transition-all duration-200 shadow-md border border-[#F0DFC8]/50 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Premium Art-like Image Showcase & Buy Actions */}
            <div className="w-full md:w-1/2 flex-shrink-0 flex flex-col justify-between p-6 md:p-8 bg-[#FDFBF7] relative border-b md:border-b-0 md:border-r border-[#F0DFC8]/35">
              <div className="absolute inset-4 border border-[#F0DFC8]/45 rounded-2xl pointer-events-none" />
              <div className="absolute top-8 left-8 flex flex-col gap-2 z-10">
                <span className="bg-white/90 backdrop-blur-sm border border-[#F0DFC8]/60 text-[#A67C35] text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full font-bold shadow-sm">
                  100% Certified
                </span>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="w-full flex items-center justify-center relative z-0 group py-4 flex-grow"
              >
                {/* Rounded square container for the product image */}
                <div className="relative overflow-hidden bg-white rounded-3xl border border-[#F0DFC8]/40 shadow-sm w-full max-w-[280px] md:max-w-[320px] aspect-square flex items-center justify-center p-4">
                  <img
                    src={imageSrc}
                    alt={title}
                    className="object-contain w-full h-full max-h-64 rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Floating Price Badge */}
                <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm border border-[#F0DFC8]/50 px-4 py-2.5 rounded-[1.25rem] shadow-md z-10">
                  <span className="font-['Libre_Baskerville'] text-[#1A1410] text-[11px] font-bold tracking-wide">
                    Price : <span className="text-[#C9954A]">₹ {price.toLocaleString()}</span>
                  </span>
                </div>
              </motion.div>

              {/* Actions under the image */}
              <div className="mt-4 px-2 relative z-10">
                <div className="divider-gold mb-3" />
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] text-[#A67C35] italic font-light">
                    *Taxes included in price
                  </span>
                </div>

                {/* Call To Actions */}
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={handleAddToWishlist}
                    className="btn-outline flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border border-[#C9954A] hover:bg-[#FDF6EF]/50 transition-all duration-300 text-[10px] font-bold tracking-widest uppercase cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    Wishlist
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="btn-gold flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#1A1410] hover:bg-[#C9954A] text-white shadow-lg transition-all duration-300 text-[10px] font-bold tracking-widest uppercase cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Luxury Details & Typography */}
            <div 
              className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-white"
              data-lenis-prevent
            >
              <div>
                <span className="text-[9px] font-bold tracking-[0.25em] text-[#A67C35] uppercase block mb-1">
                  Atelier Luxury Collection
                </span>
                
                <h2 className="font-['Playfair_Display'] text-xl md:text-2.5xl font-bold text-[#1A1410] tracking-wide leading-tight">
                  {title}
                </h2>

                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-0.5 bg-[#FDF6EF] px-2.5 py-1 rounded-lg border border-[#F0DFC8]/40">
                    {renderStars()}
                    <span className="text-xs font-semibold text-[#A67C35] ml-1.5">{reviews}</span>
                  </div>
                </div>

                <div className="divider-gold my-4" />

                {/* Specifications Grid */}
                {(karat || goldWeight) && (
                  <div className="mb-4">
                    <span className="text-[9px] font-bold tracking-[0.15em] text-[#A67C35] uppercase block mb-2.5">
                      Crafting Specifications
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      {karat && (
                        <div className="p-2.5 bg-[#FDF6EF]/50 border border-[#F0DFC8]/30 rounded-xl">
                          <span className="text-[9px] text-[#6B5E54] block uppercase tracking-wider font-medium">Metal Purity</span>
                          <span className="text-xs font-bold text-[#1A1410] mt-0.5 block">{karat}</span>
                        </div>
                      )}
                      {goldWeight && (
                        <div className="p-2.5 bg-[#FDF6EF]/50 border border-[#F0DFC8]/30 rounded-xl">
                          <span className="text-[9px] text-[#6B5E54] block uppercase tracking-wider font-medium">Metal Weight</span>
                          <span className="text-xs font-bold text-[#1A1410] mt-0.5 block">{goldWeight}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Narrative Description */}
                <div className="mt-4">
                  <span className="text-[9px] font-bold tracking-[0.15em] text-[#A67C35] uppercase block mb-1.5">
                    The Narrative & Artistry
                  </span>
                  <p 
                    className="text-[#4A3F3A] text-[12px] leading-relaxed max-h-60 overflow-y-auto pr-2 font-light"
                    data-lenis-prevent
                  >
                    {description || "Exquisite craftsmanship meets timeless design in this beautiful jewelry piece. Handcrafted to perfection, it serves as the ultimate statement of luxury and elegance for any special occasion."}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-3 border-t border-[#F0DFC8]/25">
                <p className="text-[9px] tracking-widest uppercase text-[#A67C35]/65 text-center font-medium">
                  Designed and Handcrafted with Passion
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
