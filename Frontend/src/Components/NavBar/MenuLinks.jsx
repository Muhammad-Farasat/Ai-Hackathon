// src/components/NavBar/MenuLinks.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const MenuLinks = ({ menu, setMenu, layout }) => {
  const linkStyles = `
    font-sans tracking-wider uppercase text-sm font-medium transition-colors duration-300 relative
    after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-amber-400
    after:bottom-[-4px] after:left-0 after:transform after:transition-transform after:duration-300
  `;

  const getLinkClass = (linkName) => {
    return menu === linkName
      ? 'text-amber-400 after:scale-x-100'
      : 'text-gray-200 hover:text-amber-400 after:scale-x-0 hover:after:scale-x-100';
  };
  
  const layoutClass = layout === 'horizontal' 
    ? 'flex-row items-center gap-8' 
    : 'flex-col items-start gap-6 text-xl'; // Larger text for mobile sidebar

  return (
    <ul className={`flex ${layoutClass}`}>
      <li onClick={() => setMenu("shop")}>
        <Link to="/" className={`${linkStyles} ${getLinkClass('shop')}`}>Shop</Link>
      </li>
      <li onClick={() => setMenu("mens")}>
        <Link to="/mens" className={`${linkStyles} ${getLinkClass('mens')}`}>Men</Link>
      </li>
      <li onClick={() => setMenu("womens")}>
        <Link to="/womens" className={`${linkStyles} ${getLinkClass('womens')}`}>Women</Link>
      </li>
      <li onClick={() => setMenu("kids")}>
        <Link to="/kids" className={`${linkStyles} ${getLinkClass('kids')}`}>Kids</Link>
      </li>
    </ul>
  );
};

export default MenuLinks;