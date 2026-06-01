import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Sparkles, ArrowUpRight, Share2 } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function PremiumHero() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async (e) => {
    e.preventDefault();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Jewels | Ultra-Luxury Digital Flagship',
          text: 'Discover timeless elegance and exceptional craftsmanship at World Of Jewels.',
          url: window.location.origin
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!", {
        position: 'bottom-right',
        style: {
          background: '#ffffff',
          border: '1px solid #F0DFC8',
          padding: '12px 18px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(115, 92, 0, 0.06)'
        }
      });
    }
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
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden w-full">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 z-0 scale-105"
        style={{
          transform: `scale(1.05) translateY(${scrollY * 0.15}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <img 
          alt="Luxury jewelry model banner" 
          className="w-full h-full object-cover" 
          src="https://thegracepk.com/cdn/shop/files/3-Ana-Luisa-Jewelry-Necklaces-Pendants-Gold-Heart-Necklace-Laure-Mother-of-Pearl-Gold.webp?v=1697035297&width=1000"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Social Icons Left */}
      <div className="absolute opacity-0 sm:opacity-100 left-4 lg:left-margin-desktop top-1/2 -translate-y-1/2 flex flex-col gap-6 z-20">
        <a 
          href="https://www.instagram.com/xanatomy.in" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 hover:scale-105 active:scale-95 transition-all"
          aria-label="Facebook"
        >
          <FaFacebookF className="w-6 h-6" />
        </a>
        <a 
          href="https://www.instagram.com/xanatomy.in" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 hover:scale-105 active:scale-95 transition-all"
          aria-label="Instagram"
        >
          <FaInstagram className="w-6 h-6" />
        </a>
        <a 
          href="https://wa.me/916361329208" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 hover:scale-105 active:scale-95 transition-all"
          aria-label="WhatsApp"
        >
          <FaWhatsapp className="w-6 h-6" />
        </a>
        <button 
          onClick={handleShare}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 hover:scale-105 active:scale-95 transition-all cursor-pointer border-none"
          aria-label="Share"
        >
          <Share2 className="w-6 h-6" />
        </button>
      </div>

      {/* Hero Central Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="font-display-lg text-6xl md:text-8xl md:text-display-lg text-white leading-tight mb-12 mix-blend-difference tracking-tight uppercase">
          Luxury <br/> Jewelry
        </h1>
        <div className="flex flex-col items-center justify-between">
          <button 
            onClick={() => {
              const newsletter = document.querySelector('#newsletter');
              if (newsletter) newsletter.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white text-on-surface px-6 py-4 rounded-4xl font-label-caps text-label-caps flex items-center gap-3 hover:bg-black/70 hover:text-white transition-all duration-500 shadow-xl group cursor-pointer"
          >
            CONTACT US
            <div className="w-8 h-8 rounded-3xl bg-on-surface text-surface flex items-center justify-center group-hover:bg-surface group-hover:text-on-surface transition-colors duration-500">
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </div>
          </button>
        </div>
      </div>

      {/* Small Card Bottom Left */}
      <div className="absolute bottom-20 left-4 lg:left-margin-desktop z-20 text-left max-w-[calc(100%-2rem)] sm:max-w-[380px]">
        <div className="bg-white/10 p-4 rounded-3xl shadow-2xl flex gap-6 items-center">
          <div className="w-32 h-24 overflow-hidden rounded-2xl flex-shrink-0">
            <img 
              alt="Gold chain collection" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSdo20CjbrmicXqKEuWXss7-12oeyDUhdkzo1uZSwyQd5YJ7tfWFV_m3LERuGMqlryRibl2tTRfzuV7QNkeTRsLA1SsKhtj-isWBY9i5DtZA1V8fgk3d8IUkVBMTXp8IctsOsRxxKgOPx-im8R46itrHezm49KRX9TRFAADaOEpVlmjBQRddDWMHSnPPDz0H9nrgaYrq7BjTY7ds-FF15eoYtA7fmtrjcONkcM7bJhYIT7Uh0hLIjITttAiaNLnbDLJJdOlMehIJx7"
            />
          </div>
          <div>
            <h3 className="font-bold text-base md:text-lg leading-tight mb-2 text-white font-headline-md">
              Unlock Your Potential Your Journey
            </h3>
            <span 
              onClick={() => navigate('/products')}
              className="text-xs font-bold underline underline-offset-4 decoration-primary text-secondary hover:text-white transition-colors uppercase tracking-widest cursor-pointer"
            >
              Shop Now
            </span>
          </div>
        </div>
      </div>

      {/* Branding Bottom Right */}
      <div className="absolute bottom-20 right-4 lg:right-margin-desktop z-20 text-white text-right max-w-xs hidden sm:block">
        <p className="font-bold mb-2 font-display-lg text-4xl">World Of Jewels</p>
        <p className="text-sm text-white/80 leading-relaxed font-light">
          Join a passionate community of luxury connoisseurs, supporting and celebrating milestone memories together.
        </p>
      </div>
    </section>
  );
}