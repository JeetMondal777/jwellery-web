import React, { useState, useEffect } from 'react';
import { Package, Calendar, XCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/order`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/users/order/${orderId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) => prev.filter(o => o._id !== orderId));
      toast.success('Order cancelled.');
    } catch (err) {
      console.error(err);
      toast.error('Could not cancel order. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="text-center mb-12">
          <div className="h-10 w-48 shimmer-gold rounded-lg mx-auto" />
          <div className="divider-gold w-20 mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-[#F0DFC8] p-5 space-y-4">
              <div className="h-24 shimmer-gold rounded-lg" />
              <div className="h-4 w-3/4 shimmer-gold rounded" />
              <div className="h-4 w-1/2 shimmer-gold rounded" />
              <div className="h-10 w-28 shimmer-gold rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <XCircle className="w-8 h-8 text-[#7F1D1D]" />
        </div>
        <p className="text-[#7F1D1D]">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-center text-[#1A1410] mb-4">
          My <span className="text-[#C9954A]">Orders</span>
        </h1>
        <div className="divider-gold w-20 mx-auto mt-4 mb-16" />
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-20 h-20 rounded-full bg-[#F0DFC8] flex items-center justify-center mb-6">
            <Package className="w-10 h-10 text-[#C9954A]" />
          </div>
          <p className="font-['Playfair_Display'] text-2xl text-[#4A3F3A] mb-2">No orders yet</p>
          <p className="text-[#6B5E54] text-sm mb-8">Your order history will appear here.</p>
          <a href="/products" className="btn-outline text-sm">Start Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-center text-[#1A1410] mb-4">
        My <span className="text-[#C9954A]">Orders</span>
      </h1>
      <div className="divider-gold w-20 mx-auto mt-4 mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => {
          const placedAt = new Date(order.createdAt || Date.now());
          const expected = new Date(placedAt);
          expected.setDate(expected.getDate() + 7);
          const expectedDateStr = expected.toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          });
          const d = order.deliveryDetails || {};

          return (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-sm border border-[#F0DFC8] overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-5">
                <div className="flex items-center gap-4 border-b border-[#F0DFC8] pb-4">
                  <div className="w-16 h-16 flex-shrink-0 rounded-lg border border-[#F0DFC8] overflow-hidden bg-[#FDF6EF]">
                    <img
                      src={order.imgLink || order.imglink}
                      alt={order.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-['Playfair_Display'] font-semibold text-base text-[#1A1410] truncate">
                      {order.title}
                    </h3>
                    <p className="text-[#C9954A] font-bold mt-1">₹{order.price}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2.5">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#6B5E54] font-medium">Delivery Details</p>
                  <p className="text-sm text-[#1A1410]">
                    <span className="text-[#6B5E54]">To: </span>
                    {d.name}
                  </p>
                  <p className="text-sm text-[#4A3F3A] leading-snug">
                    {d.location}
                    {d.landmark ? `, ${d.landmark}` : ''}, {d.state} - {d.pincode}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="bg-[#F0DFC8] text-[#A67C35] text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">COD</span>
                    <div className="flex items-center gap-1.5 text-[#6B5E54] text-xs">
                      <Calendar className="w-3.5 h-3.5 text-[#C9954A]" />
                      <span>Expected: <span className="text-[#C9954A] font-semibold">{expectedDateStr}</span></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#F0DFC8] px-5 py-3 flex justify-end">
                <button
                  onClick={() => handleCancel(order._id)}
                  className="btn-danger text-xs"
                >
                  Cancel Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;