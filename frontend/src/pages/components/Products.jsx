import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import axios from 'axios';
import ProdDetails from './ProdDetails';
import jewellery from '../../assets/jwellery.json';
import useWishlistStore from '../../store/wishlist.store';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ProductsGrid() {
  const { pathname } = useLocation();
  const query       = useQuery();
  const searchTerm  = query.get('search')?.toLowerCase()   || '';
  const categoryTerm= query.get('category')?.toLowerCase() || '';

  const wishlist         = useWishlistStore((s) => s.wishlist);
  const addToWishlist    = useWishlistStore((s) => s.addToWishlist);
  const removeFromWishlist = useWishlistStore((s) => s.removeFromWishlist);

  const isWishlisted = (title) =>
    wishlist.some((item) => item.title === title);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const filtered = jewellery.filter((p) => {
    const t = p.title.toLowerCase();
    if (categoryTerm) return p.category?.toLowerCase() === categoryTerm;
    return t.includes(searchTerm) || p.category?.toLowerCase().includes(searchTerm);
  });

  const handleWishlistClick = async (e, product) => {
    e.stopPropagation();
    const token = localStorage.getItem('token');

    try {
      if (isWishlisted(product.title)) {
        const existing = wishlist.find((i) => i.title === product.title);
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/users/wishlist/${existing._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        removeFromWishlist(existing._id);
      } else {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/users/wishlist`,
          {
            title:   product.title,
            imgLink: product.imglink,
            price:   product.price,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        addToWishlist(res.data);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Could not update wishlist');
    }
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < full ? 'text-[#C9954A] fill-[#C9954A]' : 'text-[#E8D5C0]'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-36 pt-20 pb-16"
      style={pathname === "/" ? { marginTop: '0px' } : {}}
    >
      <div className="text-center mb-16">
        <h2 className="font-display-lg text-5xl md:text-7xl text-on-surface leading-none">
          {pathname === '/' ? (
            <>
              Our <span className="text-primary font-bold">Most</span> Selling Jewelleries
            </>
          ) : (
            <>
              All <span className="text-primary font-bold">Jewelleries</span>
            </>
          )}
        </h2>
        <div className="divider-gold w-24 mx-auto mt-6" />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[#4A3F3A] text-lg">
            {categoryTerm
              ? `No products in "${categoryTerm}" collection.`
              : 'No products match your search.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer bg-[#FFFBFA] rounded-[1.75rem] border border-[#F0DFC8] p-3 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col justify-between"
              onClick={() => setSelectedProduct(product)}
            >
              <div>
                <div className="relative overflow-hidden bg-[#FDF6EF] rounded-2xl">
                  <img
                    src={product.imglink}
                    alt={product.title}
                    className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-700 ease-out rounded-2xl"
                  />
                  <span className="absolute top-3 left-3 bg-[#FFFBFA]/90 backdrop-blur-sm text-[#A67C35] text-[10px] uppercase tracking-[0.12em] px-3 py-1.5 rounded-full font-bold shadow-sm border border-[#F0DFC8]/50">
                    {product.category}
                  </span>
                  <button
                    onClick={(e) => handleWishlistClick(e, product)}
                    className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 cursor-pointer shadow-sm ${
                      isWishlisted(product.title)
                        ? 'bg-[#C9954A] text-white shadow-md'
                        : 'bg-[#FFFBFA]/90 backdrop-blur-sm text-[#4A3F3A] hover:bg-white hover:scale-110'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 transition-all duration-300 ${
                        isWishlisted(product.title) ? 'fill-white scale-110' : ''
                      }`}
                    />
                  </button>
                </div>

                <div className="px-2 pt-4">
                  <span className="text-[10px] font-bold tracking-widest text-[#A67C35] uppercase block mb-1">
                    Premium Collection
                  </span>
                  <h3 className="font-['Playfair_Display'] font-semibold text-base md:text-lg text-[#1A1410] tracking-wide leading-tight line-clamp-1">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-1 mt-1.5">
                    {renderStars(product.review)}
                    <span className="text-[11px] text-[#6B5E54] ml-1">({product.review})</span>
                  </div>
                  <p className="mt-3 text-lg md:text-xl font-bold text-[#C9954A]">
                    ₹ {product.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="px-2 pb-1 mt-5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(product);
                  }}
                  className="w-full py-3 bg-primary/70 hover:bg-[#C9954A] text-white font-medium text-xs tracking-widest uppercase rounded-full shadow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <ProdDetails
          imageSrc={selectedProduct.imglink}
          title={selectedProduct.title}
          price={selectedProduct.price}
          reviews={selectedProduct.review}
          karat={selectedProduct.karat}
          goldWeight={selectedProduct.gold_weight}
          description={selectedProduct.description}
          onAddToWishlist={(e) => handleWishlistClick(e, selectedProduct)}
          onAddToCart={() => {}}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}