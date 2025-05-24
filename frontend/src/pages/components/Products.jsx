// src/components/ProductsGrid.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
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

  // Zustand store
  const wishlist         = useWishlistStore((s) => s.wishlist);
  const addToWishlist    = useWishlistStore((s) => s.addToWishlist);
  const removeFromWishlist = useWishlistStore((s) => s.removeFromWishlist);
  

  // Helper to check if a product is wishlisted (by title)
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
        // Find the actual wishlist item in store to get its _id
        const existing = wishlist.find((i) => i.title === product.title);
        // Call DELETE on your backend
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/users/wishlist/${existing._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // Remove from Zustand
        removeFromWishlist(existing._id);
      } else {
        // Call POST on your backend
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/users/wishlist`,
          {
            title:   product.title,
            imgLink: product.imglink,
            price:   product.price,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // Add the returned item (with its _id) into Zustand
        addToWishlist(res.data);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Could not update wishlist');
    }
  };

  return (
<div
  className="max-w-7xl mx-auto px-4 mt-36 pt-20 py-8"
  style={pathname === "/" ? { marginTop: '0px' } : {}}
>
        <h1 className="text-4xl mb-7 font-semibold text-center">
        {pathname === '/'
          ? <>Our <span className="text-rose-700 ">Most</span> Selling Jewelleries</>
          : <>All <span className="text-rose-700">Jewelleries</span></>}
      </h1>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">
          {categoryTerm
            ? `No products in “${categoryTerm}”.`
            : 'No products match your search.'}
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-md">
                <img
                  src={product.imglink}
                  alt={product.title}
                  className="w-full rounded-3xl object-center p-5 h-64 object-cover group-hover:scale-105 transition-transform duration-200"
                />

                <button
                  onClick={(e) => handleWishlistClick(e, product)}
                  className={`absolute top-2 right-2 cursor-pointer p-2 rounded-full ${
                    isWishlisted(product.title)
                      ? 'bg-yellow-400 text-white'
                      : 'bg-white text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={isWishlisted(product.title) ? 'white' : 'none'}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 
                         0 016.364 0L12 7.636l1.318-1.318a4.5 
                         4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 
                         4.5 0 010-6.364z"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-4 text-center">
                <h3 className="text-lg font-medium text-gray-900">
                  {product.title}
                </h3>
                <p className="mt-1 text-xl font-bold text-gray-800">
                  ₹ {product.price.toLocaleString()}
                </p>
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
          reviewCount={selectedProduct.reviewCount ?? 0}
          description={selectedProduct.description}
          onAddToWishlist={(e) => handleWishlistClick(e, selectedProduct)}
          onAddToCart={() =>
            alert(`Added ${selectedProduct.title} to cart!`)
          }
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
