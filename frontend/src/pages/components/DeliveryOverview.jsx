import React from 'react';
import axios from 'axios';
import useCartStore from '../../store/cart.store';
import toast from 'react-hot-toast';

const DeliveryOverview = ({ product, details, onBack, onClose }) => {

  const fetchCart = useCartStore((state) => state.fetchCart);

  // Compute expected date (7 days from today)
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
      toast.success(`Successfully placed order for ${product.title} !`);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    }finally {
      fetchCart(); // Refresh cart after placing order
    }
  };

  return (
    <div>
      <div className="flex p-4 border-b">
        <div className="w-1/3">
          <img
            src={product.imgLink || product.imglink}
            alt={product.title}
            className="object-cover w-full h-full rounded"
          />
        </div>
        <div className="w-2/3 pl-4 flex flex-col justify-center">
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="mt-2 text-rose-600 font-bold">₹{product.price}</p>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h4 className="text-xl font-medium">Delivery Details</h4>
        <p className="text-sm">
          <strong>Name:</strong> {details.name}
        </p>
        <p className="text-sm">
          <strong>Phone:</strong> {details.number}
        </p>
        <p className="text-sm">
          <strong>Address:</strong> {details.location}
          {details.landmark ? `, ${details.landmark}` : ''}, {details.state} -{' '}
          {details.pincode}
        </p>
        <p className="text-sm">
          <strong>Delivery type:</strong> COD
        </p>
        <p className="text-sm">
          <strong>Expected date:</strong>{' '}
          <span className="text-rose-700">{expectedDateStr}</span>
        </p>
      </div>

      <div className="flex justify-between p-4 border-t">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100 transition"
        >
          Edit Details
        </button>
        <button
          onClick={handlePlaceOrder}
          className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default DeliveryOverview;
