import React from 'react';
import { ArrowLeft, Calendar, MapPin, CreditCard } from 'lucide-react';
import axios from 'axios';
import useCartStore from '../../store/cart.store';
import toast from 'react-hot-toast';

const DeliveryOverview = ({ product, details, onBack, onClose }) => {
  const fetchCart = useCartStore((state) => state.fetchCart);

  const today = new Date();
  const expected = new Date(today.setDate(today.getDate() + 7));
  const expectedDateStr = expected.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { headers: { Authorization: `Bearer ${token}` } };
      const payload = {
        title: product.title,
        imgLink: product.imgLink ?? product.imglink,
        price: product.price,
        deliveryDetails: { ...details },
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/order`,
        payload,
        headers
      );
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/users/cart/${product._id}`,
        headers
      );
      toast.success(`Successfully placed order for ${product.title}!`);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      fetchCart();
    }
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-full text-[#4A3F3A]/60 hover:text-[#4A3F3A] hover:bg-[#F0DFC8]/50 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="font-['Playfair_Display'] text-2xl text-[#C9954A]">Order Overview</h2>
      </div>

      <div className="gold-accent-left bg-[#FFFBFA] rounded-xl p-5 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 flex-shrink-0 rounded-lg border-2 border-[#F0DFC8] overflow-hidden bg-[#FDF6EF]">
            <img
              src={product.imgLink || product.imglink}
              alt={product.title}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="font-['Playfair_Display'] font-semibold text-lg text-[#1A1410]">{product.title}</h3>
            <p className="text-[#C9954A] font-bold text-xl mt-1">₹{product.price}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs uppercase tracking-[0.15em] text-[#6B5E54] font-medium">Delivery Details</h4>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#6B5E54] mb-1">Name</p>
            <p className="text-[#1A1410] font-medium text-sm">{details.name}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#6B5E54] mb-1">Phone</p>
            <p className="text-[#1A1410] font-medium text-sm">{details.number}</p>
          </div>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wider text-[#6B5E54] mb-1">Address</p>
          <p className="text-[#1A1410] text-sm">
            {details.location}
            {details.landmark ? `, ${details.landmark}` : ''}
            <br />
            {details.state} - {details.pincode}
          </p>
        </div>

        <div className="divider-gold my-4" />

        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-[#C9954A]" />
          <span className="text-sm text-[#4A3F3A]">Payment: </span>
          <span className="bg-[#F0DFC8] text-[#A67C35] text-xs font-semibold px-3 py-1 rounded-full">COD</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#C9954A]" />
          <span className="text-sm text-[#4A3F3A]">Expected: </span>
          <span className="text-[#C9954A] font-bold">{expectedDateStr}</span>
        </div>
      </div>

      <div className="flex justify-between gap-3 mt-8 pt-6 border-t border-[#F0DFC8]">
        <button
          onClick={onBack}
          className="btn-outline flex-1 text-sm"
        >
          Edit Details
        </button>
        <button
          onClick={handlePlaceOrder}
          className="btn-gold flex-1 text-sm"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default DeliveryOverview;