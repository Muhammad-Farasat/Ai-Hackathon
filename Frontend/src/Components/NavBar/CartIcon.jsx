// src/components/NavBar/CartIcon.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';

const CartIcon = () => {
  const cartItemCount = 0; // Replace with your actual cart count from context/state

  return (
    <Link to="/cart" className="relative flex items-center gap-2 text-gray-200 hover:text-amber-400 transition-colors duration-300 group">
      <FiShoppingCart className="w-6 h-6" />
      {/* <span className="font-sans text-sm font-medium hidden sm:inline group-hover:text-amber-400">Cart</span> */}
      <div className="absolute -top-1 -right-2 bg-amber-400 text-[#1a1a1a] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
        {cartItemCount}
      </div>
    </Link>
  );
};

export default CartIcon;