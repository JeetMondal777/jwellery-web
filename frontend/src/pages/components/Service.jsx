import React, { useState } from 'react';
import reviewImg from '../../assets/images/review.png';

export default function Service() {
  const testimonials = [
    {
      quote: "Outstanding customer support! They went above and beyond to help me resolve my issue. I felt valued as a customer, and their commitment to ensuring my satisfaction left a lasting impression.",
      author: "Sumaiya Mita",
      role: "Happy Customer",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-8UaFAx155hzEU9gwHdOZxYxfaqYfmQh8Tu8EsGXITSpLZASz2qwQitH5jUnxPP3WVUryGJtq9ztLg45wS1nE4dadc1GYphDbt6YhhTDf9SVso48sTvEEVQ174Usu4InmA0FU-rO_-IpkDMzwQgJgs6EkvIjqOaTos_WI_vKl7JrkiMWinKM4bk-wBl32RyBvSkROhRH3U8NNVTo-6TkSLamH7KDv0jwRiVg_mEiXaBJB2Rgx_XJYI5W1ZLIsGIcqBtQABtVCWYRo"
    },
    {
      quote: "The craftsmanship is simply breathtaking. Every detail of the ring was polished to absolute perfection, and the luxury unboxing experience made it feel like an absolute dream.",
      author: "Ayesha Khan",
      role: "Collector",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-8UaFAx155hzEU9gwHdOZxYxfaqYfmQh8Tu8EsGXITSpLZASz2qwQitH5jUnxPP3WVUryGJtq9ztLg45wS1nE4dadc1GYphDbt6YhhTDf9SVso48sTvEEVQ174Usu4InmA0FU-rO_-IpkDMzwQgJgs6EkvIjqOaTos_WI_vKl7JrkiMWinKM4bk-wBl32RyBvSkROhRH3U8NNVTo-6TkSLamH7KDv0jwRiVg_mEiXaBJB2Rgx_XJYI5W1ZLIsGIcqBtQABtVCWYRo"
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const activeTestimonial = testimonials[activeIdx];

  return (
    <section id="jewels-assurance" className="py-section-gap bg-surface-container-lowest w-full text-left">
      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto">
        
        {/* Trust Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-section-gap">
          {/* Item 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-[32px]">replay</span>
            </div>
            <h3 className="font-headline-md text-xl md:text-2xl font-bold mb-3 text-on-surface">Safe Return Process</h3>
            <p className="text-secondary leading-relaxed text-sm font-light">
              Secure and hassle-free return process within 30 days of acquisition.
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-[32px]">local_shipping</span>
            </div>
            <h3 className="font-headline-md text-xl md:text-2xl font-bold mb-3 text-on-surface">Fast Delivery</h3>
            <p className="text-secondary leading-relaxed text-sm font-light">
              Receive your order faster than ever before with white-glove courier service.
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-[32px]">verified</span>
            </div>
            <h3 className="font-headline-md text-xl md:text-2xl font-bold mb-3 text-on-surface">Quality Products</h3>
            <p className="text-secondary leading-relaxed text-sm font-light">
              Presented in elegant jewelry packaging, perfect for gifting your loved ones.
            </p>
          </div>
        </div>

        {/* Customer Feedback split view */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-center mt-section-gap pt-12 border-t border-primary/10">
          {/* Header Description */}
          <div className="space-y-6">
            <h2 className="font-display-lg text-6xl md:text-8xl text-on-surface leading-none mb-6">
              From our<br/>
              <span className="italic font-light text-primary">Customers</span>
            </h2>
            <p className="font-body-lg text-body-lg text-secondary font-light">
              Explore firsthand accounts of satisfaction, inspiration, and the impact of our offerings straight from the voices of those we serve.
            </p>
          </div>

          {/* Portrait Photo */}
          <div className="flex justify-center">
            <div className="relative rounded-xl overflow-hidden shadow-2xl max-w-sm aspect-[4/5] w-full">
              <img 
                alt="Happy Customer Portrait" 
                className="w-full h-full object-cover transition-opacity duration-500" 
                src="https://rubans.in/cdn/shop/files/rubans-24k-gold-plated-ruby-emerald-cubic-zirconia-studded-temple-necklace-set-with-pearl-beaded-necklaces-necklace-sets-chains-mangalsutra-1151354688.jpg?v=1755710846&width=610"
              />
            </div>
          </div>

          {/* Review Quote block */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="relative">
              <span className="material-symbols-outlined text-[48px] text-primary/30 mb-4 block">format_quote</span>
              <p className="font-headline-md text-body-lg text-on-surface leading-relaxed font-light italic">
                "{activeTestimonial.quote}"
              </p>
            </div>
            <div>
              <h4 className="font-headline-md text-headline-md text-on-surface">{activeTestimonial.author}</h4>
              <p className="text-label-caps text-secondary uppercase tracking-widest text-xs font-semibold">{activeTestimonial.role}</p>
            </div>
            
            {/* Arrows */}
            <div className="flex gap-4">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-outline flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer text-on-surface hover:border-transparent"
              >
                <span className="material-symbols-outlined text-[20px]">west</span>
              </button>
              <button 
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-outline flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer text-on-surface hover:border-transparent"
              >
                <span className="material-symbols-outlined text-[20px]">east</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
