import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      number: "01",
      question: "What standards of quality and craftsmanship do you uphold?",
      answer: "Every piece at Jewels World is crafted to meet the highest standards of haute joaillerie. Our master artisans meticulously hand-select each gem, utilizing VS/VVS clarity diamonds and ethically sourced, recycled 18K and 22K gold. Every setting is engineered for structural longevity, ensuring your heirloom remains flawless for generations."
    },
    {
      number: "02",
      question: "How is my luxury shipment handled and delivered?",
      answer: "We guarantee secure, fully insured delivery for all orders. Shipments are transported via specialized armored couriers, packaged in tamper-evident, climate-sealed signature boxes. For your security, an adult signature and government-issued ID validation are strictly required upon handoff."
    },
    {
      number: "03",
      question: "Are your jewelry pieces hallmarked and certified?",
      answer: "Yes, every creation is fully authenticated. All gold items bear the official Bureau of Indian Standards (BIS) Hallmark along with a unique HUID code for absolute tracking. Additionally, all diamonds and precious gemstones are accompanied by internationally recognized grading certificates from the GIA or IGI."
    },
    {
      number: "04",
      question: "Do you offer bespoke design and personalization services?",
      answer: "Indeed. Our bespoke design service allows you to collaborate directly with our master designers to customize gemstone selections, metal types, or sketch a custom piece from concept to completion."
    },
    {
      number: "05",
      question: "What lifetime care and services do you provide?",
      answer: "We provide complimentary lifetime cleaning, inspection, and polishing for all Jewels World creations. We also offer one complimentary ring resizing within the first year of acquisition."
    }
  ];

  return (
    <section className="py-section-gap bg-surface w-full text-left">
      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
        {/* Left Side: Headline */}
        <div className="md:col-span-5 pr-0 md:pr-12">
          <span className="text-label-caps font-label-caps text-primary tracking-widest block mb-4 uppercase text-xs">
            Assurance &amp; Clarity
          </span>
          <h2 className="font-display-lg text-5xl md:text-7xl text-on-surface mb-6 leading-none">
            Frequently <br/>
            <span className="text-primary italic font-light">Asked Questions</span>
          </h2>
          <p className="font-body-md text-secondary leading-relaxed font-light mb-8">
            Explore our curated guides on craftsmanship, armored shipping, and official certification standards. If you require further assistance, our concierge is always available.
          </p>
        </div>

        {/* Right Side: Accordion Grid */}
        <div className="md:col-span-7 flex flex-col divide-y divide-outline-variant/30">
          {faqData.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div key={index} className="py-6 first:pt-0 last:pb-0">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                >
                  <div className="flex items-start gap-4 md:gap-6 flex-grow pr-4">
                    <span className="font-display-lg text-xl md:text-2xl text-primary/60 italic font-light">
                      {faq.number}
                    </span>
                    <h3 className="font-headline-md text-lg md:text-xl text-on-surface group-hover:text-primary transition-colors duration-300 font-medium">
                      {faq.question}
                    </h3>
                  </div>
                  <span className={`p-1.5 rounded-full border border-primary/20 text-primary transition-transform duration-500 hover:bg-primary/5 ${
                    isOpen ? 'rotate-180 bg-primary/5' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>
                
                {/* Expanded Answer with smooth height transition */}
                <div 
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="font-body-md text-[#5f5e5b] text-sm md:text-base leading-relaxed pl-10 md:pl-12 font-light max-w-2xl">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
