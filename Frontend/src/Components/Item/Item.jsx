// src/components/Item/Item.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export const Item = ({ id, title, img, price }) => {
  return (
    // The main container. 'group' is essential for the hover effects on child elements.
    <Link 
      to={`/product/${id}`} 
      onClick={() => window.scrollTo(0, 0)} 
      className="group relative block overflow-hidden"
    >
      {/* 
        THE ANIMATING BORDER: 
        These four spans create the border effect. They are positioned absolutely 
        and are scaled to 0 initially. On group-hover, they scale to 100%, 
        creating the "drawing" animation.
      */}
      <span className="absolute top-0 left-0 h-[2px] w-full bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
      <span className="absolute bottom-0 right-0 h-[2px] w-full bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-right"></span>
      <span className="absolute top-0 left-0 w-[2px] h-full bg-amber-400 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-in-out origin-top"></span>
      <span className="absolute bottom-0 right-0 w-[2px] h-full bg-amber-400 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-in-out origin-bottom"></span>

      {/* Product Image */}
      <div className="overflow-hidden bg-[#1a1a1a]">
        <img
          src={img}
          alt={title}
          className="
            w-full h-auto object-cover aspect-[3/4] 
            transition-transform duration-500 ease-in-out
            group-hover:scale-105
          "
        />
      </div>

      {/* Text content area */}
      <div className="pt-4 pb-2 text-center">
        {/* Title: Always visible */}
        <h3 className="text-base font-sans text-gray-200 mb-1 transition-colors group-hover:text-white">
          {title}
        </h3>

        {/* 
          THE REVEAL:
          Price and the "View Details" prompt are hidden initially (opacity-0)
          and fade in on group-hover.
        */}
        <div className="
          transition-opacity duration-300 ease-in-out 
          opacity-0 group-hover:opacity-100
        ">
          <p className="text-lg font-semibold text-amber-400 font-sans">
            PKR {price.toLocaleString()}
          </p>
          <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-1">
            <span>View Details</span>
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};