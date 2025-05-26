import React, { useState, useEffect } from 'react';
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

  if (loading) return <p className="text-center mt-8">Loading orders…</p>;
  if (error)   return <p className="text-center mt-8 text-red-600">{error}</p>;
  if (orders.length === 0) return <p className="text-center pt-24">No orders found.</p>;

  return (
    <div className="max-w-7xl pt-28 mx-auto ">
      <h1 className="text-2xl font-bold text-center mb-8">My <span className='text-rose-700 '>Orders</span></h1>

      {/* Responsive grid: 1 col on mobile, 2 on md, 3 on lg */}
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => {
          const placedAt = new Date(order.createdAt || Date.now());
          const expected = new Date(placedAt);
          expected.setDate(expected.getDate() + 7);
          const expectedDateStr = expected.toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          });
          const d = order.deliveryDetails || {};

          return (
            <div key={order._id} className="bg-white rounded-xl shadow-xl p-4 flex flex-col">
              {/* Product Info */}
              <div className="flex border-b pb-4">
                <div className="w-1/3">
                  <img
                    src={order.imgLink || order.imglink}
                    alt={order.title}
                    className="object-cover w-full h-24 rounded"
                  />
                </div>
                <div className="w-2/3 pl-4 flex flex-col justify-center">
                  <h3 className="text-lg font-semibold">{order.title}</h3>
                  <p className="mt-2 text-rose-600 font-bold">₹{order.price}</p>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="p-4 space-y-2 flex-grow">
                <h4 className="text-xl font-medium">Delivery Details</h4>
                <p className="text-sm"><strong>Name:</strong> {d.name}</p>
                <p className="text-sm"><strong>Phone:</strong> {d.number}</p>
                <p className="text-sm">
                  <strong>Address:</strong> {d.location}
                  {d.landmark ? `, ${d.landmark}` : ''}, {d.state} – {d.pincode}
                </p>
                <p className="text-sm"><strong>Delivery type:</strong> COD</p>
                <p className="text-sm">
                  <strong>Expected date:</strong>{' '}
                  <span className="text-rose-700">{expectedDateStr}</span>
                </p>
              </div>

              {/* Cancel Button */}
              <div className="flex justify-end pt-2 border-t">
                <button
                  onClick={() => handleCancel(order._id)}
                  className="px-4 py-2 bg-gradient-to-br from-red-700 to-rose-600 via-rose-400 text-white rounded hover:scale-103 hover:rounded-xl cursor-pointer transition-all duration-300"
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
