import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Bangle from "../../assets/images/BangleMain.png";
import Necklace from "../../assets/images/NecklaceMain.png";
import Earring from "../../assets/images/EarringMain.png";
import Ring from "../../assets/images/RingMain.png";
import BackgroundPattern from "../../assets/images/background.png";

export default function PremiumJewelryCarousel() {
  const navigate = useNavigate();
  const items = [
    { 
      id: 1, 
      image: Bangle, 
      title: "MAHARANI KANKANS", 
      subtitle: "ANCIENT BEAUTY", 
      description: "Inspired by royal heritage, these bangles feature intricate craftsmanship with traditional motifs reimagined for modern era." 
    },
    { 
      id: 2, 
      image: Necklace, 
      title: "ROYAL GORGET", 
      subtitle: "TIMELESS ELEGANCE", 
      description: "A statement necklace that combines centuries-old artistry with contemporary styling, perfect for both celebrations and everyday luxury." 
    },
    { 
      id: 3, 
      image: Earring, 
      title: "CHANDELIER EARRINGS", 
      subtitle: "RADIANT GLAMOUR", 
      description: "Delicately crafted earrings that cascade with brilliance, bringing movement and light to frame your face with classic sophistication." 
    },
    { 
      id: 4, 
      image: Ring, 
      title: "LOTUS BLOOM RING", 
      subtitle: "ETERNAL SYMBOL", 
      description: "This exquisite ring captures the sacred lotus in the center of the ring in full bloom, representing purity and beauty in a refined 22k gold setting." 
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(i => (i + 1) % items.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [items.length]);

  const handleClick = () => {
    setActiveIndex(i => (i + 1) % items.length);
  };

  const activeItem = items[activeIndex];

  const fadeBlur = {
    initial: { opacity: 0, filter: 'blur(40px)', y: 20, scale: 0.95 },
    animate: { opacity: 1, filter: 'blur(0px)', y: 0, scale: 1, transition: { duration: 0.7, ease: 'easeInOut' } },
    exit: { opacity: 0, filter: 'blur(40px)', y: -20, scale: 0.5, transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  // Custom colors based on your provided color code - enhanced for more vibrance
  const customColors = {
    primary: "#D4A349", // Enhanced gold/bronze color (more vibrant than #B07F36)
    secondary: "#E0927D", // Enhanced rose gold complement
    text: {
      heading: "text-amber-800",
      subheading: "text-rose-700",
      paragraph: "text-gray-700"
    }
  };

  return (
    <div 
      className="relative w-full pb-10 lg:pb-0 lg:min-h-screen overflow-hidden flex flex-col"
      style={{ 
        backgroundImage: `url(${BackgroundPattern})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Header Section with premium styling */}
      {/* <div className="container mx-auto px-8 pt-24 mb-8">
        <h1 className="text-5xl font-bold tracking-tight">
        <span className="bg-gradient-to-br bg-clip-text text-transparent from-yellow-200 via-yellow-500 to-yellow-200 ">
          {/* <span style={{ color: customColors.primary }}> */}
            {/* Jewellery Of The Month
          </span>
        </h1>
      </div> */} 
      


      {/* Main Content */}
<div 
  className="relative w-full min-h-screen overflow-hidden flex flex-col"
  style={{ 
    backgroundImage: `url(${BackgroundPattern})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
>
  {/* Header */}
<div
  className="
    container mx-auto
    px-4 sm:px-6 md:px-8
    lg:pt-24 pt-28 mb-8
    text-center lg:text-left
  "
>
  <h1 className="text-3xl mb-20 sm:text-4xl md:text-5xl font-bold tracking-tight">
    <span className="bg-gradient-to-br bg-clip-text text-transparent from-yellow-200 via-yellow-500 to-yellow-200">
      Jewellery Of The Month
    </span>
  </h1>
</div>


  {/* Main Content */}
  <div className="flex-1 container  mx-auto px-4 sm:px-6 md:px-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
    
    {/* Text Content */}
    <div className="w-full lg:w-1/2 xl:w-2/5  mt-[-60px] lg:mt-[-80px] relative space-y-6 sm:space-y-8 pr-0 sm:pr-4 md:pr-8 text-center lg:text-left">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          variants={fadeBlur}
          initial="initial"
          animate="animate"
          exit="exit"
          className="space-y-4 sm:space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl bg-gradient-to-br bg-clip-text text-transparent from-yellow-400 to-yellow-600 font-bold leading-tight">
            {activeItem.title}
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-3xl bg-gradient-to-br bg-clip-text text-transparent from-yellow-600 to-yellow-800 font-semibold">
            {activeItem.subtitle}
          </h3>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-amber-900 max-w-full sm:max-w-lg md:max-w-2xl mx-auto lg:mx-0">
            {activeItem.description}
          </p>
        </motion.div>
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/products')}
        className="mt-6 animate-gradient sm:mt-8 lg:mt-0 text-white z-20 cursor-pointer px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#D4A349] via-rose-300 to-rose-600 rounded-xl text-sm sm:text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mx-auto lg:mx-0"
      >
        Explore Collection
      </motion.button>
    </div>

    {/* Image Section */}
    <div className="w-full lg:w-1/2 xl:w-3/5 flex justify-center relative mb-8 sm:mb-12 lg:mb-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          variants={fadeBlur}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative w-4/5 sm:w-3/4 md:w-[400px] aspect-square cursor-pointer"
          onClick={handleClick}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-100 opacity-20 rounded-full blur-xl"></div>
            <img
              src={activeItem.image}
              alt={activeItem.title}
              className=" h-full lg:ml-40 mt-[-40px] object-cover mx-auto"
              style={{ 
                filter: 'contrast(1.2) saturate(1.3) drop-shadow(0 20px 30px rgba(212, 163, 73, 0.5))',
                transform: 'translateY(-5%)',
                height: activeItem.id === 4 ? '85%' : '100%'
              }}
            />

        </motion.div>
      </AnimatePresence>
    </div>
  </div>
</div>

            {/* Global Styles */}
      <style jsx global>{`
        @keyframes instagram-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-instagram-gradient {
          animation: instagram-gradient 4s ease infinite;
          background-size: 200% 200%;
        }
        .expanding-underline {
          @apply relative inline-block cursor-pointer text-rose-400 font-semibold;
        }
        .expanding-underline::before {
          content: "";
          @apply absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-full bg-rose-600 origin-center scale-x-0 transition-transform duration-300;
        }
        .expanding-underline:hover::before {
          @apply scale-x-100;
        }
      `}</style>
    </div>
  );
}