import React from 'react';
import { MdOutlinePlumbing } from 'react-icons/md';
import { RiFindReplaceFill } from 'react-icons/ri';
import { LuHeartHandshake } from 'react-icons/lu';

export default function Service() {
  return (
    <section className="py-12 md:py-16 w-full bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-semibold">
            <span className="text-black mr-1 sm:mr-2">Jewels</span>
            <span className="text-rose-700">Assurance</span>
          </h2>
          <p className="mt-2 text-gray-500 text-base sm:text-lg">
            Crafted by experts, cherished by you
          </p>
        </div>

        <div className="mt-8 md:mt-12 flex flex-row flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10">
          {/* Quality Craftsmanship */}
          <div className="flex lg:flex-row flex-col items-center w-40 sm:w-48 md:w-56">
            <div className="bg-gradient-to-br from-yellow-300 to-[#B07F36] p-3 sm:p-4 rounded-lg shadow-md">
              <MdOutlinePlumbing className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <span className="mt-3 sm:mt-0 sm:ml-3 text-base sm:text-lg font-medium text-gray-800 text-center sm:text-left">
              Quality Craftsmanship
            </span>
          </div>

          {/* Ethically Sourced */}
          <div className="flex flex-col sm:flex-row items-center w-40 sm:w-48 md:w-56">
            <div className="bg-gradient-to-br from-yellow-300 to-[#B07F36] p-3 sm:p-4 rounded-lg shadow-md">
              <RiFindReplaceFill className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <span className="mt-3 sm:mt-0 sm:ml-3 text-base sm:text-lg font-medium text-gray-800 text-center sm:text-left">
              Ethically Sourced
            </span>
          </div>

          {/* 100% Transparency */}
          <div className="flex flex-col sm:flex-row items-center w-40 sm:w-48 md:w-56">
            <div className="bg-gradient-to-br from-yellow-300 to-[#B07F36] p-3 sm:p-4 rounded-lg shadow-md">
              <LuHeartHandshake className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <span className="mt-3 sm:mt-0 sm:ml-3 text-base sm:text-lg font-medium text-gray-800 text-center sm:text-left">
              100% Transparency
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
