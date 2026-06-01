import React from 'react';
import { useNavigate } from 'react-router-dom';
import wedding from "../../assets/images/wedding.jpg";
import dailywear from "../../assets/images/dailywear.jpg";

const World = () => {
  const navigate = useNavigate();

  return (
    <section className="py-section-gap w-full bg-surface text-left">
      {/* Title */}
      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto text-center mb-16">
        <h2 className="font-display-lg text-6xl md:text-8xl mb-2 text-on-surface leading-none">
          Jewels <span className="text-primary font-bold">World</span> of Luxury
        </h2>
        <p className="text-secondary font-body-md italic font-light">A companion for every occasion</p>
      </div>

      {/* Categories Grid */}
      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-12 gap-gutter items-stretch">
        
        {/* Left Side: Wedding Card (col-span-8) */}
        <div 
          onClick={() => navigate('/products?category=wedding')}
          className="col-span-12 md:col-span-8 relative rounded-2xl overflow-hidden min-h-[500px] group shadow-lg cursor-pointer"
        >
          <img 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            alt="Traditional Indian bride in wedding temple gold jewelry"
            src={wedding}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-12 w-full flex justify-between items-end">
            <h3 className="font-display-lg text-display-lg hidden sm:block text-surface">Wedding</h3>
            <span className="glass-panel w-16 h-16 rounded-full flex items-center justify-center border border-surface/30 hover:bg-surface hover:text-on-surface transition-colors duration-300">
              <span className="material-symbols-outlined">east</span>
            </span>
          </div>
        </div>

        {/* Right Side: Dailywear & Bespoke Consultation (col-span-4) */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-gutter">
          {/* Dailywear Card */}
          <div 
            onClick={() => navigate('/products?category=dailywear')}
            className="relative flex-1 rounded-2xl overflow-hidden group shadow-lg min-h-[235px] cursor-pointer"
          >
            <img 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              alt="Luxury daily wear gold bangles and diamond ring"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxpStwp6uaJxw7i-l9fi8gMyGHihEIxg1B7dSPKna_48vHJ_uMjLIeq_ccEX9y-0qEWI3OJRziJ7UYNVKtxXuH0WvCf5VjR3ibVeQnLBZbNyaXKiNV_bmFP72pv71oazG-QjE0Fwegig8M32UaliDw--Rc-V5FtptiWGFNmZhNJsWGp2-AbMjRdGjasDCrPLq5oVaJ1og0r3c3CebdmlPSgkvGUIRzoK5S-V-GHU4vUWRo36ego1Or4bqat_V2o1kUWMdX1YCLeVTQ"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="font-headline-lg text-headline-lg text-surface">Dailywear</h3>
            </div>
          </div>

          {/* Bespoke Consult Card */}
          <div className="bg-surface-container-low p-8 rounded-2xl hairline-border flex flex-col justify-center items-center text-center">
            <span className="material-symbols-outlined text-primary text-[48px] mb-4">diamond</span>
            <h4 className="font-headline-md text-headline-md mb-2 text-on-surface">Bespoke</h4>
            <p className="text-secondary text-sm mb-6 font-light leading-relaxed">
              Create a piece as unique as your story. Consult with our master artisans.
            </p>
            <button 
              onClick={() => navigate('/products')}
              className="text-label-caps font-label-caps text-primary border-b-2 border-primary pb-1 cursor-pointer hover:opacity-80 transition-opacity"
            >
              START YOUR DESIGN
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default World;
