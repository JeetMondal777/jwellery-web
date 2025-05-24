// src/components/Cart.jsx
import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import useCartStore from '../../store/cart.store'
import DeliveryModal from './DeliveryModal'  // <-- import your modal

export default function Cart() {
  const cartItems      = useCartStore(state => state.cartItems)
  const removeFromCart = useCartStore(state => state.removeFromCart)

  // local state for showing the delivery modal
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showDeliveryModal, setShowDeliveryModal] = useState(false)

  const handleOrderClick = (product) => {
    setSelectedProduct(product)
    setShowDeliveryModal(true)
  }

  const handleCloseModal = () => {
    setShowDeliveryModal(false)
    setSelectedProduct(null)
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-48 py-8">
        <h1 className="text-4xl mb-4 font-semibold text-center">
          Your <span className="text-rose-700">Cart</span>
        </h1>
        <hr className="border-t-2 border-rose-500 mb-10" />
        <p className="text-center text-gray-500">Your cart is empty.</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-48 py-8 relative">
      <h1 className="text-4xl mb-4 font-semibold text-center">
        Your <span className="text-rose-700">Cart</span>
      </h1>
      <hr className="border-t-2 border-rose-500 mb-10" />

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cartItems.map(product => {
          const rawImg = product.imglink ?? product.imgLink ?? ''
          const imgSrc = typeof rawImg === 'string'
            ? rawImg.replace(/^"|"$/g, '')
            : ''

          const priceNum = typeof product.price === 'string'
            ? Number(product.price)
            : product.price

          return (
            <div key={product._id} className="cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl shadow-md group">
                <img
                  src={imgSrc}
                  alt={product.title}
                  className="w-full rounded-3xl object-center p-5 h-64 object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-medium text-gray-900">
                  {product.title}
                </h3>
                <p className="mt-1 text-xl font-bold text-rose-700">
                  ₹ {Number.isFinite(priceNum) ? priceNum.toLocaleString() : '—'}
                </p>
                <div className="flex justify-center gap-4 mt-3">
                  <button
                    onClick={e => { 
                      e.stopPropagation()
                      removeFromCart(product._id)
                    }}
                    className="p-2 px-5 text-rose-600 bg-gradient-to-r from-rose-300 to-yellow-400 cursor-pointer hover:scale-105 hover:rounded-2xl transition-all duration-200 rounded"
                  >
                    <FaTrash size={16} />
                  </button>
                  <button
                    onClick={e => { 
                      e.stopPropagation()
                      handleOrderClick(product)
                    }}
                    className="px-4 py-2 text-white bg-gradient-to-r from-yellow-300 to-[#B07F36] cursor-pointer hover:scale-105 hover:rounded-xl transition-all duration-200 rounded"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {showDeliveryModal && selectedProduct && (
        <DeliveryModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
