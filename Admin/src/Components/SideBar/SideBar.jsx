import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillProduct } from "react-icons/ai";
import { FaThList, FaBoxOpen } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5"; // A good icon for a dashboard/stats page

const SideBar = () => {
  // A helper function for NavLink classes to keep the JSX clean
  const getNavLinkClass = ({ isActive }) => {
    const baseClasses = 'flex items-center gap-4 p-3 rounded-lg transition-all duration-200 max-lg:justify-center';
    
    // THEME CHANGE: Classes for active vs. inactive links
    if (isActive) {
      return `${baseClasses} bg-amber-400/10 text-amber-400 font-semibold border-l-4 border-amber-400`;
    } else {
      return `${baseClasses} text-gray-400 hover:bg-gray-800 hover:text-white`;
    }
  };

  return (
    // THEME CHANGE: Main sidebar container with our dark theme
    <div className='
      fixed top-0 left-0 h-screen w-64 bg-[#1a1a1a] flex flex-col
      border-r border-gray-800 shadow-2xl z-50
      max-lg:w-20 max-md:hidden
    '>
      {/* Logo/Title */}
      <div className='px-4 py-5 border-b border-gray-800'>
        {/* THEME CHANGE: Using the brand's serif font for the title */}
        <h1 className='
          text-2xl text-white font-serif font-bold text-center tracking-wider
          max-lg:hidden
        '>
          URBANFABRIC
        </h1>
        {/* A smaller icon-based logo for the collapsed state */}
        <div className="hidden max-lg:flex justify-center">
            <IoStatsChart className="text-amber-400 text-3xl" />
        </div>
      </div>

      {/* Navigation Links */}
      <nav className='flex-1 flex flex-col gap-2 p-3'>
        {/* Suggested: Dashboard Link */}
        <NavLink to="/admin" end className={getNavLinkClass}>
          <IoStatsChart className="text-xl shrink-0" />
          <span className='max-lg:hidden'>Dashboard</span>
        </NavLink>

        <NavLink to="/addproduct" className={getNavLinkClass}>
          <AiFillProduct className="text-xl shrink-0" />
          <span className='max-lg:hidden'>Add Product</span>
        </NavLink>

        <NavLink to="/listofproduct" className={getNavLinkClass}>
          <FaThList className="text-xl shrink-0" />
          <span className='max-lg:hidden'>Products</span>
        </NavLink>

        <NavLink to="/orders" className={getNavLinkClass}>
          <FaBoxOpen className="text-xl shrink-0" />
          <span className='max-lg:hidden'>Orders</span>
        </NavLink>
      </nav>

      {/* Optional: Footer/User Profile area */}
      <div className="p-3 mt-auto border-t border-gray-800">
          {/* You could add a user profile link here later */}
      </div>
    </div>
  );
};

export default SideBar;