import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Mail, ArrowUpRight, ShieldAlert } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Email format validation check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast((t) => (
        <div className="flex items-start gap-3 text-left">
          <div className="mt-0.5 text-[#ba1a1a]">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-on-surface mb-1">Invalid Email Address</p>
            <p className="text-xs text-secondary leading-relaxed">
              Please provide a valid email format to proceed with your subscription.
            </p>
          </div>
        </div>
      ), {
        position: 'bottom-right',
        duration: 4000,
        style: {
          background: '#ffffff',
          border: '1px solid #ffdad6',
          padding: '16px',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(186, 26, 26, 0.08)',
          maxWidth: '380px',
        }
      });
      return;
    }

    // Success Toast with premium attention-driving copy
    toast((t) => (
      <div id="newsletter" className="flex items-start gap-3 text-left">
        <div className="mt-0.5 text-primary">
          <Mail className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-on-surface mb-1">Subscription Confirmed</p>
          <p className="text-xs text-secondary leading-relaxed mb-2">
            Thanks for Your Interest! If You want to build a premium digital flagship like this, kindly drop a mail at our design studio.
          </p>
          <a 
            href="mailto:contact@xanatomy.in" 
            className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1"
            onClick={() => toast.dismiss(t.id)}
          >
            Mail contact@xanatomy.in <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    ), {
      position: 'bottom-right',
      duration: 8000,
      style: {
        background: '#ffffff',
        border: '1px solid #F0DFC8',
        padding: '16px',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(115, 92, 0, 0.08)',
        maxWidth: '380px',
      }
    });

    setEmail('');
  };

  return (
    <section className="relative h-[614px] flex items-center justify-center overflow-hidden w-full">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          className="w-full h-full object-cover brightness-50" 
          alt="Luxury wedding rings resting on silk"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqYoM8z1VAfE9aQUBs4T6VuUgBqdtBws2Vs6K8-JICi1XwIbTevq9UgivKzwEGsY4boc0fm4cJZCo6Ev9R_Q_oRLrk0IHTwQmCHavxxGhOlVHTpMlaP8CwqCbyhgfDl1tHMnC0P4SgCgQN24VOKlfbIhoj835LtYw13iltopPEvuDM28et7cx3SQHIZnzER5sdgkzDf61Jd-qKiw89BIJpoMWAnfh5EIoKgSBc0B5IOUITE87-EGxXzmJIiAHIO2JkXOJ8NIzm8GNW"
        />
      </div>

      {/* Subscription Card */}
      <div className="relative z-10 max-w-2xl w-full px-4 text-center">
        <h2 className="font-display-lg text-5xl md:text-7xl text-surface mb-4 leading-none">
          Subscribe to our Newsletter
        </h2>
        <p className="text-surface-bright/80 font-body-md mb-12 font-light">
          Be the first to know about new collections and exclusive private offers.
        </p>
        
        <form 
          onSubmit={handleSubmit}
          className="bg-white flex flex-col md:flex-row gap-4 max-w-xl mx-auto glass-panel p-2 rounded-xl border border-surface/20"
        >
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-grow  text-on-surface px-6 py-4 focus:outline-none  placeholder:text-outline text-sm rounded-lg border border-transparent shadow-inner"
          />
          <button 
            type="submit"
            className="bg-on-surface text-surface px-10 py-4 rounded-lg font-label-caps text-label-caps hover:bg-black/70 transition-all duration-300 uppercase tracking-widest cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
