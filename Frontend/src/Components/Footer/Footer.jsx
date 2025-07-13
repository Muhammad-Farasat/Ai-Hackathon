import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCcVisa, FaCcPaypal, FaCcStripe } from "react-icons/fa"; // Swapped Google Pay for Stripe as an example
import { FiFlag } from "react-icons/fi";

const Footer = () => {
  // Animation variants - these are solid, no changes needed
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const footerLinks = {
    shop: ["Men", "Women", "Kids", "New Arrivals", "Collections"],
    support: ["Contact Us", "Account", "Store Locations", "Shipping & Delivery", "Returns"],
    info: ["About", "Careers", "Sustainability", "Press", "Affiliates"],
    company: ["URBANFABRIC", "Blending tradition with modern elegance, we offer curated fashion for the discerning individual."],
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
      className="bg-black text-white pt-20 pb-8 px-4 sm:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info Section */}
          <motion.div variants={item}>
            <h3 className="font-serif text-2xl font-bold mb-4 text-white">
                {footerLinks.company[0]}
            </h3>
            <p className="text-gray-400 leading-relaxed pr-4">
                {footerLinks.company[1]}
            </p>
          </motion.div>

          {/* Dynamically created link sections */}
          {['shop', 'support', 'info'].map(sectionKey => (
            <motion.div variants={item} key={sectionKey}>
              {/* THEME CHANGE: Themed headings */}
              <h3 className="font-sans uppercase tracking-wider text-sm font-semibold mb-5 text-amber-400">
                {sectionKey}
              </h3>
              <ul className="space-y-3">
                {footerLinks[sectionKey].map((link) => (
                  <motion.li
                    key={link}
                    whileHover={{ x: 5, color: '#fBBF24' }} // amber-400 hex
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Link
                      to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                      // THEME CHANGE: Softer link color, golden hover
                      className="text-gray-400 transition-colors duration-200"
                    >
                      {link}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={item}
          className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6"
        >
          {/* Copyright */}
          <div className="text-sm text-gray-500 order-2 sm:order-1 text-center sm:text-left">
            © {new Date().getFullYear()} Urban Fabric. All rights reserved.
          </div>

          {/* Payment Icons */}
          <div className="flex gap-3 order-1 sm:order-2">
            {[FaCcVisa, FaCcPaypal, FaCcStripe].map((Icon, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -3, scale: 1.1 }}
                className="text-gray-500 hover:text-white transition-colors text-3xl"
              >
                <Icon />
              </motion.div>
            ))}
          </div>
          
          {/* Legal Links */}
          <div className="flex items-center space-x-4 order-3">
            {["Terms", "Privacy"].map((link) => (
              <Link
                key={link}
                to="#"
                className="text-sm text-gray-500 hover:text-amber-400 transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;