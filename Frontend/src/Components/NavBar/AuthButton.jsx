// src/components/NavBar/AuthButton.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

const AuthButton = () => {
  return (
    <Link to="/LoginSignup">
      <button className="
        group relative inline-flex items-center justify-center px-5 py-2
        text-sm font-medium text-amber-400 font-sans tracking-wide
        border border-amber-400 rounded-full
        overflow-hidden
        transition-all duration-300 ease-in-out
        hover:bg-amber-400 hover:text-[#1a1a1a] hover:border-amber-400
      ">
        <FiLogIn className="mr-2 transition-transform duration-300 group-hover:translate-x-[-4px]" />
        <span>Login</span>
      </button>
    </Link>
  );
};

export default AuthButton;