// src/components/Footer.jsx
import React from 'react';
import { FaInstagram, FaFacebookF, FaPaypal, FaYoutube } from 'react-icons/fa';
import { RiTwitterXLine, RiVisaFill } from 'react-icons/ri';
import { CiCreditCard1 } from 'react-icons/ci';
import { SiRazorpay } from 'react-icons/si';

const Footer = () => (
  <footer className="bg-rose-100 w-full mt-32 text-rose-400">
    <div className="container mx-auto px-6 py-10">
      {/* Top three columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Useful Links */}
        <div>
          <h3 className="mb-4 text-xl font-semibold text-rose-500">Useful Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-rose-500">Delivery Information</a></li>
            <li><a href="#" className="hover:text-rose-500">International Shipping</a></li>
            <li><a href="#" className="hover:text-rose-500">Payment Options</a></li>
            <li><a href="#" className="hover:text-rose-500">Track your Order</a></li>
            <li><a href="#" className="hover:text-rose-500">Returns</a></li>
            <li><a href="#" className="hover:text-rose-500">Find a Store</a></li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h3 className="mb-4 text-xl font-semibold text-rose-500">Information</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-rose-500">Blog</a></li>
            <li><a href="#" className="hover:text-rose-500">Offers & Contest Details</a></li>
            <li><a href="#" className="hover:text-rose-500">Help & FAQs</a></li>
            <li><a href="#" className="hover:text-rose-500">About Jewels</a></li>
          </ul>
        </div>

        {/* Contact Us / Chat With Us */}
        <div>
          <h3 className="mb-2 text-xl font-semibold text-rose-500">Contact Us</h3>
          <p className="mb-6">+91 12345678901</p>
          <h3 className="mb-2 text-xl font-semibold text-rose-500">Chat With Us</h3>
          <p className="mb-2">x@y.com</p>
          <div className="border-t border-rose-200 my-4" />
          <div className="flex space-x-4 text-2xl">
            {/* Replace with actual chat icons if desired */}
            <span className="hover:text-rose-500 cursor-pointer">💬</span>
            <span className="hover:text-rose-500 cursor-pointer">✉️</span>
            <span className="hover:text-rose-500 cursor-pointer">🗨️</span>
          </div>
        </div>
      </div>

      {/* Social */}
      <hr className="border-rose-200 my-8" />
      <div className="flex items-center space-x-4">
        <h3 className="text-xl font-semibold text-rose-500">Social</h3>
        <div className="flex space-x-3">
          <a href="#" className="p-2 bg-white rounded-full text-rose-500 hover:bg-rose-200">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="p-2 bg-white rounded-full text-rose-500 hover:bg-rose-200">
            <RiTwitterXLine size={20} />
          </a>
          <a href="#" className="p-2 bg-white rounded-full text-rose-500 hover:bg-rose-200">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className="p-2 bg-white rounded-full text-rose-500 hover:bg-rose-200">
            <FaYoutube size={20} />
          </a>
        </div>
      </div>

      {/* Payments */}
      <hr className="border-rose-200 my-8" />
      <div className="flex items-center space-x-6">
        <RiVisaFill size={32} className="hover:text-rose-500" />
        <FaPaypal size={32} className="hover:text-rose-500" />
        <CiCreditCard1 size={32} className="hover:text-rose-500" />
        <SiRazorpay size={32} className="hover:text-rose-500" />
      </div>

      {/* Bottom line */}
      <div className="mt-8 pt-6 border-t border-rose-200 flex flex-col md:flex-row items-center justify-between text-sm">
        <p>© 2025 Jewels Pvt. Limited. All Rights Reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-rose-500">Terms &amp; Conditions</a>
          <a href="#" className="hover:text-rose-500">Privacy Policy</a>
          <a href="#" className="hover:text-rose-500">Disclaimer</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
