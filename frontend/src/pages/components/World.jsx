import React from 'react';
import wedding from "../../assets/images/wedding.jpg";
import dailywear from "../../assets/images/dailywear.jpg";

const World = () => {
  return (
    <div className="bg-white mt-[-850px] lg:mt-[-600px] text-center px-4 py-12 font-serif">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800">Jewels <span className='text-rose-700'>World</span> of Luxury</h1>
      {/* Subheading */}
      <p className="text-lg text-gray-500 mt-2">A companion for every occasion</p>

      {/* Cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* Wedding Card */}
        <div className="object-cover rounded-xl overflow-hidden ">
          <img
            src={wedding}
            alt="Wedding"
            className="w-full h-[400px] object-cover filter hover:brightness-[60%] transition duration-300 cursor-pointer"
          />

        </div>

        {/* daily wear */}
        <div className="relative rounded-xl overflow-hidden shadow-lg">
          <img
            src={dailywear}
            alt="dailywear"
            className="w-full h-[400px] object-cover filter hover:brightness-[60%] transition duration-300 cursor-pointer"
          />

        </div>
      </div>
    </div>
  );
};

export default World;
