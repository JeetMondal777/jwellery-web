import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaHeart, FaQuestionCircle, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { BsHandbag } from 'react-icons/bs';
import axios from 'axios';
import toast from 'react-hot-toast';

function ProfilePanel({ onLogout, onClose }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = async () => {
    const toastId = toast.loading('Logging out...');
    try {
      await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/logout`,
        { withCredentials: true }
      );

      // Clear localStorage and notify
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      toast.dismiss(toastId);
      toast.success('Logged out successfully!');
      navigate('/log');

      if (onLogout) onLogout();
    } catch (error) {
      toast.dismiss(toastId);
      console.error('Error logging out:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <div className="w-96 bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl relative overflow-hidden border border-gray-100">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute cursor-pointer top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
      >
        <FaTimes className="w-5 h-5 text-gray-500 hover:text-rose-600" />
      </button>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/20 to-yellow-100/10 pointer-events-none" />
      
      {/* Profile Header */}
      <div className="mb-8 text-center relative z-10">
        <h1 className="text-2xl mt-10 font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-yellow-500">
          {user.name}
        </h1>
        <p className="text-gray-600 text-sm mt-1">{user.email}</p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-4 mb-2 relative z-10">
        <button
          onClick={() => navigate('/order')}
          className="group cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-all duration-300 shadow-sm"
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 bg-gradient-to-br from-rose-400 to-yellow-400 rounded-lg">
              <FaBox className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-700 group-hover:text-rose-600 transition-colors font-medium">
              Orders
            </span>
          </div>
        </button>
        
        <button
          onClick={() => navigate('/cart')}
          className="group cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-all duration-300 shadow-sm"
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 bg-gradient-to-br from-rose-400 to-yellow-400 rounded-lg">
              <BsHandbag className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-700 group-hover:text-yellow-600 transition-colors font-medium">
              Cart
            </span>
          </div>
        </button>

        <button
          onClick={() => navigate('/wish')}
          className="group cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-all duration-300 shadow-sm"
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 bg-gradient-to-br from-rose-400 to-yellow-400 rounded-lg">
              <FaHeart className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-700 group-hover:text-yellow-600 transition-colors font-medium">
              Wishlist
            </span>
          </div>
        </button>
      </div>

      {/* Help Center */}
      <div className="mb-8 hover:scale-103 transition-all duration-200 bg-gray-50 hover:bg-gray-100 rounded-xl p-4  cursor-pointer shadow-sm relative z-10">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-rose-400 to-yellow-400 rounded-lg">
            <FaQuestionCircle className="w-5 h-5 text-white" />
          </div>
          <span className="text-gray-700 font-medium">Help Center</span>
        </div>
      </div>

      {/* Member Since & Logout */}
      <div className="border-t border-gray-200 pt-6 relative z-10">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <p className="text-gray-500">Member since</p>
            <p className="text-gray-700 font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex cursor-pointer items-center space-x-2 bg-rose-100 hover:bg-rose-200 px-4 py-2 rounded-lg transition-colors"
          >
            <FaSignOutAlt className="w-5 h-5 text-rose-600" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-yellow-500 font-medium">
              Log Out
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePanel;
