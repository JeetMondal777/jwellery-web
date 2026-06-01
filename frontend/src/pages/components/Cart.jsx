import { useState } from 'react'
import { Trash2, ShoppingBag } from 'lucide-react'
import useCartStore from '../../store/cart.store'
import DeliveryModal from './DeliveryModal'

export default function Cart() {
  const cartItems      = useCartStore(state => state.cartItems)
  const removeFromCart = useCartStore(state => state.removeFromCart)

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
      <div className="max-w-7xl mx-auto px-4 pt-48 pb-20">
        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-center text-[#1A1410]">
          Your <span className="text-[#C9954A]">Cart</span>
        </h1>
        <div className="divider-gold w-20 mx-auto mt-4 mb-16" />
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-20 h-20 rounded-full bg-[#F0DFC8] flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-[#C9954A]" />
          </div>
          <p className="font-['Playfair_Display'] text-2xl text-[#4A3F3A] mb-2">Your cart awaits</p>
          <p className="text-[#6B5E54] text-sm mb-8">Discover our exquisite collection and add pieces that inspire you.</p>
          <a href="/products" className="btn-outline text-sm">Browse Collection</a>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-16 relative">
      <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-center text-[#1A1410]">
        Your <span className="text-[#C9954A]">Cart</span>
      </h1>
      <div className="divider-gold w-20 mx-auto mt-4 mb-12" />

      <div className="max-w-3xl mx-auto space-y-4">
        {cartItems.map(product => {
          const rawImg = product.imglink ?? product.imgLink ?? ''
          const imgSrc = typeof rawImg === 'string'
            ? rawImg.replace(/^"|"$/g, '')
            : ''

          const priceNum = typeof product.price === 'string'
            ? Number(product.price)
            : product.price

          return (
            <div
              key={product._id}
              className="card-luxury gold-accent-left p-4 sm:p-5 flex items-center gap-4 sm:gap-5"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg border-2 border-[#F0DFC8] overflow-hidden bg-[#FDF6EF]">
                <img
                  src={imgSrc}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-['Playfair_Display'] font-semibold text-base sm:text-lg text-[#1A1410] truncate">
                  {product.title}
                </h3>
                <p className="text-[#6B5E54] text-xs sm:text-sm mt-0.5">Fine Jewellery</p>
                <p className="text-lg sm:text-xl font-bold text-[#C9954A] mt-1.5">
                  ₹ {Number.isFinite(priceNum) ? priceNum.toLocaleString() : '—'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                <button
                  onClick={e => {
                    e.stopPropagation()
                    removeFromCart(product._id)
                  }}
                  className="p-2.5 rounded-full text-[#7F1D1D]/60 hover:text-[#7F1D1D] hover:bg-red-50 transition-all duration-200 cursor-pointer"
                  title="Remove"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  onClick={e => {
                    e.stopPropagation()
                    handleOrderClick(product)
                  }}
                  className="btn-gold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 whitespace-nowrap"
                >
                  Order Now
                </button>
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