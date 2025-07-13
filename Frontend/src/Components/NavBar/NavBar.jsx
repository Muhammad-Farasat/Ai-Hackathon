import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import MenuLinks from "./MenuLinks"; // We'll update this
import CartIcon from "./CartIcon";     // We'll update this
import AuthButton from "./AuthButton";   // We'll update this

const NavBar = () => {
  const [menu, setMenu] = useState("shop");
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Handle scroll effect - logic is perfect, no changes needed
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open - logic is perfect
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  // Update menu based on route - logic is perfect
  useEffect(() => {
    const currentPath = location.pathname.split('/')[1] || "shop";
    setMenu(currentPath);
    if(location.pathname === '/') setMenu('shop');
  }, [location.pathname]);

  // THEME CHANGE: Applying our new "Modern & Gilded" theme classes
  const navClasses = isScrolled || !isHomePage
    ? "bg-[#1a1a1a]/80 backdrop-blur-lg shadow-xl"
    : "bg-transparent";
  
  const textClass = isScrolled || !isHomePage ? "text-gray-200" : "text-white";

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed w-full z-50 py-4 px-6 transition-all duration-300 ${navClasses} ${textClass}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="text-3xl font-serif font-bold transition-colors hover:text-amber-400">
            URBANFABRIC
          </Link>

          {/* THEME CHANGE: Desktop Menu (visible on large screens) */}
          <div className="hidden lg:flex items-center gap-8">
            <MenuLinks menu={menu} setMenu={setMenu} layout="horizontal" />
          </div>

          {/* THEME CHANGE: Desktop Icons & Auth (visible on large screens) */}
          <div className="hidden lg:flex items-center gap-6">
            <AuthButton />
            <CartIcon />
          </div>

          {/* Hamburger Menu Button (visible on small screens) */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden text-3xl transition-colors hover:text-amber-400"
          >
            <RxHamburgerMenu />
          </button>
        </div>
      </nav>

      {/* Sidebar - for mobile */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      >
        {/* THEME CHANGE: Dark sidebar panel */}
        <div
          className={`absolute right-0 top-0 h-full w-4/5 max-w-sm bg-[#1a1a1a] text-gray-200 shadow-2xl transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 text-2xl text-gray-400 hover:text-amber-400 transition-colors"
          >
            <RxCross1 />
          </button>

          {/* Sidebar Content */}
          <div className="pt-20 px-8 flex flex-col h-full">
            <MenuLinks menu={menu} setMenu={setMenu} layout="vertical" />
            <div className="mt-auto mb-10 flex flex-col items-start gap-y-6">
              <CartIcon />
              <AuthButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;