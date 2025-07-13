import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaBolt, FaLeaf, FaExchangeAlt, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const WhyUs = () => {
  const features = [
    {
      icon: <FaStar className="w-6 h-6" />,
      title: "Curated Excellence",
      description: "Handpicked designs from global artisans for unmatched quality."
    },
    {
      icon: <FaBolt className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Express shipping with real-time tracking in 100+ countries."
    },
    {
      icon: <FaLeaf className="w-6 h-6" />,
      title: "Ethically Crafted",
      description: "Sustainable materials, fair wages, and eco-friendly packaging."
    },
    {
      icon: <FaExchangeAlt className="w-6 h-6" />,
      title: "Hassle-Free Returns",
      description: "30-day returns with no questions asked."
    }
  ];

  // Animation for the cards
  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      }
    }
  };

  return (
    // THEME CHANGE: Using the dark charcoal background for a premium, grounded feel
    <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto text-center">
        {/* THEME CHANGE: Header with serif font and golden accents */}
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <h2 className="font-serif text-5xl max-sm:text-4xl font-bold mb-4 text-white">
                Why <span className="text-amber-400">Choose</span> Us?
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-16 tracking-wide">
                We blend innovation with integrity to redefine your shopping experience.
            </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
              // THEME CHANGE: Dark, bordered cards with elegant hover effects
              className="group bg-[#2a2a2a] p-8 rounded-xl border border-gray-800
                         transition-all duration-300 ease-in-out transform
                         hover:-translate-y-2 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-500/5"
            >
              {/* THEME CHANGE: Themed icon container */}
              <div className="flex justify-center mb-5">
                <div className="p-4 rounded-full bg-amber-400/10 text-amber-400
                              transition-all duration-300
                              group-hover:bg-amber-400/20 group-hover:scale-110">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-100">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* THEME CHANGE: Themed CTA button (converted to a Link for better routing) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-20"
        >
          <Link to="/about"> {/* Assuming you have or will have an 'about' page */}
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                    group relative inline-flex items-center justify-center px-8 py-3
                    overflow-hidden font-medium text-amber-400
                    border-2 border-amber-400 rounded-full
                    transition-all duration-300 ease-in-out
                    hover:text-gray-900
                "
            >
                <span className="absolute top-0 right-full w-full h-full bg-amber-400 transform transition-all duration-300 ease-in-out group-hover:translate-x-full"></span>
                <span className="relative flex items-center gap-2">
                    Explore Our Story
                    <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;