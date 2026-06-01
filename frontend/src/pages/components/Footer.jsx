import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Heart, Sparkles, ArrowUpRight, ShieldAlert, Mail } from 'lucide-react';
import logo from "../../assets/images/logo.png";

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
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
      <div className="flex items-start gap-3 text-left">
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

  const showDemoToast = (e) => {
    e.preventDefault();
    toast((t) => (
      <div className="flex items-start gap-3 text-left">
        <div className="mt-0.5 text-primary">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-on-surface mb-1">Concept Flagship Feature</p>
          <p className="text-xs text-secondary leading-relaxed mb-2">
            Contents are for demo purposes only. Unlock the full feature by contacting Xanatomy.
          </p>
          <a 
            href="https://xanatomy.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1"
            onClick={() => toast.dismiss(t.id)}
          >
            Visit xanatomy.in <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    ), {
      position: 'bottom-right',
      duration: 6000,
      style: {
        background: '#ffffff',
        border: '1px solid #F0DFC8',
        padding: '16px',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(115, 92, 0, 0.08)',
        maxWidth: '380px',
      }
    });
  };

  return (
    <footer className="w-full text-left font-body-md relative bg-transparent">
      {/* Combined Newsletter Overlap Section */}
      <div className="relative w-full">
        {/* Split Background: Top half transparent, Bottom half matching footer dark bg */}
        <div className="absolute inset-0 z-0 flex flex-col pointer-events-none">
          <div className="flex-1 bg-transparent"></div>
          <div className="flex-1 bg-[#131211]"></div>
        </div>

        {/* White-Framed Newsletter Card */}
        <div className="relative z-10 px-4 md:px-margin-desktop max-w-container-max mx-auto">
          <div className="relative h-[380px] md:h-[420px] flex items-center justify-center overflow-hidden rounded-[32px] border-[6px] md:border-[10px] border-white shadow-2xl">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img 
                className="w-full h-full object-cover brightness-75" 
                alt="Luxury wedding rings resting on silk"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqYoM8z1VAfE9aQUBs4T6VuUgBqdtBws2Vs6K8-JICi1XwIbTevq9UgivKzwEGsY4boc0fm4cJZCo6Ev9R_Q_oRLrk0IHTwQmCHavxxGhOlVHTpMlaP8CwqCbyhgfDl1tHMnC0P4SgCgQN24VOKlfbIhoj835LtYw13iltopPEvuDM28et7cx3SQHIZnzER5sdgkzDf61Jd-qKiw89BIJpoMWAnfh5EIoKgSBc0B5IOUITE87-EGxXzmJIiAHIO2JkXOJ8NIzm8GNW"
              />
              <div className="absolute inset-0 bg-black/35"></div>
            </div>

            {/* Newsletter Content */}
            <div className="relative z-10 max-w-2xl w-full px-6 text-center">
              <h2 className="font-display-lg text-4xl md:text-6xl text-white mb-3 leading-none">
                Subscribe to our Newsletter
              </h2>
              <p className="text-white/80 font-body-md mb-8 text-sm md:text-base font-light">
                Be the first to know about new collections and exclusive offers.
              </p>
              
              <form 
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto items-center"
              >
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full sm:flex-1 bg-white/10 text-white border border-white/35 rounded-full px-6 py-3.5 focus:outline-none focus:ring-2 focus:ring-white/20 placeholder:text-white/60 text-sm font-light"
                />
                <button 
                  type="submit"
                  className="w-full sm:w-auto bg-white text-[#131211] px-10 py-3.5 rounded-full font-label-caps text-label-caps font-bold hover:bg-black/70 hover:text-white transition-all duration-500 uppercase tracking-widest cursor-pointer border-none"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links Block */}
      <div className="bg-[#131211] text-white pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter px-4 md:px-margin-desktop max-w-container-max mx-auto">
          
          {/* Column 1: Brand Info */}
          <div className="col-span-12 md:col-span-5 mb-12 md:mb-0">
            <img 
              src={logo} 
              alt="Jewels World" 
              onClick={() => navigate('/')} 
              className="h-10 lg:h-12 block mb-8 cursor-pointer object-contain brightness-0 invert"
            />
            <p className="text-white/60 text-sm leading-relaxed mb-8 font-light max-w-sm">
              Discover timeless elegance and exceptional craftsmanship. Shop now and let your jewelry tell your unique story.
            </p>
          </div>

          {/* Column 2: Menu */}
          <div className="col-span-6 md:col-span-2 md:col-start-7 flex flex-col gap-4">
            <h5 className="font-display-lg text-white mb-2 font-semibold text-sm uppercase tracking-wider">Menu</h5>
            <span onClick={() => navigate('/products')} className="text-white/60 hover:text-primary cursor-pointer transition-colors text-sm font-light">
              New in
            </span>
            <span onClick={() => navigate('/products?category=ring')} className="text-white/60 hover:text-primary cursor-pointer transition-colors text-sm font-light">
              Ring
            </span>
            <span onClick={() => navigate('/products?category=necklace')} className="text-white/60 hover:text-primary cursor-pointer transition-colors text-sm font-light">
              Necklace
            </span>
            <span onClick={() => navigate('/products?category=earrings')} className="text-white/60 hover:text-primary cursor-pointer transition-colors text-sm font-light">
              Earrings
            </span>
            <span onClick={() => navigate('/products')} className="text-white/60 hover:text-primary cursor-pointer transition-colors text-sm font-light">
              Gift
            </span>
            <span onClick={() => navigate('/about')} className="text-white/60 hover:text-primary cursor-pointer transition-colors text-sm font-light">
              About
            </span>
          </div>

          {/* Column 3: About */}
          <div className="col-span-6 md:col-span-2 flex flex-col gap-4">
            <h5 className="font-display-lg text-white mb-2 font-semibold text-sm uppercase tracking-wider">About</h5>
            <span onClick={() => navigate('/about')} className="text-white/60 hover:text-primary cursor-pointer transition-colors text-sm font-light">Who We Are</span>
            <a href="#" onClick={showDemoToast} className="text-white/60 hover:text-primary transition-colors text-sm font-light">Blog</a>
            <a href="#" onClick={showDemoToast} className="text-white/60 hover:text-primary transition-colors text-sm font-light">Careers</a>
            <a href="#" onClick={showDemoToast} className="text-white/60 hover:text-primary transition-colors text-sm font-light">Reviews</a>
            <a href="#" onClick={showDemoToast} className="text-white/60 hover:text-primary transition-colors text-sm font-light">Support</a>
          </div>

          {/* Column 4: Social */}
          <div className="col-span-6 md:col-span-2 flex flex-col gap-4">
            <h5 className="font-display-lg text-white mb-2 font-semibold text-sm uppercase tracking-wider">Social</h5>
            <a href="https://www.instagram.com/xanatomy.in" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors text-sm font-light">Facebook</a>
            <a href="https://www.instagram.com/xanatomy.in" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors text-sm font-light">Instagram</a>
            <a href="#" onClick={showDemoToast} className="text-white/60 hover:text-primary transition-colors text-sm font-light">X</a>
            <a href="#" onClick={showDemoToast} className="text-white/60 hover:text-primary transition-colors text-sm font-light">LinkedIn</a>
          </div>

        </div>
      </div>

      {/* Bottom Policies Bar */}
      <div className="border-t border-white/10 py-10 bg-[#131211] text-center">
        <div className="max-w-container-max mx-auto px-4 flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <a href="#" onClick={showDemoToast} className="text-xs text-white/50 hover:text-white transition-colors uppercase tracking-widest font-medium">Privacy Policy</a>
            <a href="#" onClick={showDemoToast} className="text-xs text-white/50 hover:text-white transition-colors uppercase tracking-widest font-medium">Terms &amp; Conditions</a>
            <a href="#" onClick={showDemoToast} className="text-xs text-white/50 hover:text-white transition-colors uppercase tracking-widest font-medium">Return &amp; Exchange</a>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xs text-white/40 tracking-wider">
            <span>© 2026 JEWELS WORLD. ALL RIGHTS RESERVED.</span>
            <span className="hidden md:inline">|</span>
            <span className="flex items-center gap-1 font-medium text-white/60">
              Built with <Heart className="w-3.5 h-3.5 text-[#ba1a1a] fill-[#ba1a1a] inline" /> through <a href="https://xanatomy.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline underline-offset-4 decoration-primary/30 transition-all">xanatomy.in</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
