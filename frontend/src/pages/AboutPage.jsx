import React, { useEffect } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { ShieldCheck, HeartHandshake, Eye } from 'lucide-react';

export default function AboutPage() {
  // Ensure the page scrolls to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="justify-center items-center flex flex-col w-full bg-surface text-left min-h-screen">
      <Nav />

      {/* Hero Header Section */}
      <section className="relative w-full h-[450px] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover brightness-40" 
            alt="Master artisan sketching jewelry designs"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqYoM8z1VAfE9aQUBs4T6VuUgBqdtBws2Vs6K8-JICi1XwIbTevq9UgivKzwEGsY4boc0fm4cJZCo6Ev9R_Q_oRLrk0IHTwQmCHavxxGhOlVHTpMlaP8CwqCbyhgfDl1tHMnC0P4SgCgQN24VOKlfbIhoj835LtYw13iltopPEvuDM28et7cx3SQHIZnzER5sdgkzDf61Jd-qKiw89BIJpoMWAnfh5EIoKgSBc0B5IOUITE87-EGxXzmJIiAHIO2JkXOJ8NIzm8GNW"
          />
        </div>
        <div className="relative z-10 max-w-4xl text-center px-4">
          <span className="text-label-caps font-label-caps text-surface-bright/70 tracking-widest block mb-4 uppercase text-xs">
            Our Legacy &amp; Ethos
          </span>
          <h1 className="font-display-lg text-5xl md:text-7xl text-surface leading-none mb-6">
            The World of <br/>
            <span className="text-primary italic font-light">Jewels</span>
          </h1>
          <div className="divider-gold w-24 mx-auto" />
        </div>
      </section>

      {/* Legacy Narrative Section */}
      <section className="py-section-gap w-full bg-surface">
        <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-5 pr-0 md:pr-12 mb-8 md:mb-0">
            <h2 className="font-display-lg text-4xl md:text-5xl text-on-surface leading-tight">
              Honoring centuries <br/>
              of handcrafting <br/>
              <span className="text-primary italic font-light">traditions.</span>
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="font-body-md text-secondary text-base md:text-lg leading-relaxed mb-6 font-light">
              Since our inception, Jewels World has stood as a sanctuary for those who appreciate exceptional artistry and rare beauty. We strive to bridge timeless elegance with modern execution, breathing life into fine metals and carefully curated gemstones.
            </p>
            <p className="font-body-md text-secondary text-base leading-relaxed font-light">
              Our designs are more than ornaments—they are records of emotion, tokens of devotion, and wearable sculptures meant to transcend seasons. Every diamond and setting is handled with rigorous devotion, reflecting our promise of pure quality.
            </p>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-section-gap bg-surface-container/30 w-full border-y border-outline-variant/10">
        <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <span className="text-label-caps font-label-caps text-primary tracking-widest block mb-4 uppercase text-xs">
              Pillars of Integrity
            </span>
            <h2 className="font-display-lg text-4xl md:text-6xl text-on-surface leading-none">
              What Defines <span className="text-primary italic font-light">Our House</span>
            </h2>
            <div className="divider-gold w-20 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Pillar 1: Quality */}
            <div className="bg-surface p-10 rounded-2xl border border-outline-variant/30 hover:shadow-xl transition-shadow duration-500">
              <span className="p-3 bg-primary/5 text-primary rounded-xl inline-block mb-6">
                <ShieldCheck className="w-8 h-8" />
              </span>
              <h3 className="font-headline-md text-xl text-on-surface mb-4 font-semibold">Quality &amp; Artistry</h3>
              <p className="font-body-md text-secondary text-sm md:text-base leading-relaxed font-light">
                We work strictly with top-tier VS/VVS clarity diamonds and solid 18K and 22K certified gold. Each creation is vetted twice for setting durability and precision detailing.
              </p>
            </div>

            {/* Pillar 2: Ethical Sourcing */}
            <div className="bg-surface p-10 rounded-2xl border border-outline-variant/30 hover:shadow-xl transition-shadow duration-500">
              <span className="p-3 bg-primary/5 text-primary rounded-xl inline-block mb-6">
                <HeartHandshake className="w-8 h-8" />
              </span>
              <h3 className="font-headline-md text-xl text-on-surface mb-4 font-semibold">Ethical Commitment</h3>
              <p className="font-body-md text-secondary text-sm md:text-base leading-relaxed font-light">
                All metals and gemstones are conflict-free and ethically acquired under global sourcing guidelines. We support local mining communities and promote sustainable gold practices.
              </p>
            </div>

            {/* Pillar 3: Vision */}
            <div className="bg-surface p-10 rounded-2xl border border-outline-variant/30 hover:shadow-xl transition-shadow duration-500">
              <span className="p-3 bg-primary/5 text-primary rounded-xl inline-block mb-6">
                <Eye className="w-8 h-8" />
              </span>
              <h3 className="font-headline-md text-xl text-on-surface mb-4 font-semibold">Heirloom Vision</h3>
              <p className="font-body-md text-secondary text-sm md:text-base leading-relaxed font-light">
                We reject seasonal waste. Jewels World creates timeless designs that are built structurally to hold value, designed to be worn today and passed on tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
