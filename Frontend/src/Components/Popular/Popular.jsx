import React, { useEffect, useState } from "react";
import { Item } from "../Item/Item"; // We will update this component next!
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Popular = () => {
  const [popularWomen, setPopularWomen] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/popularWomen`)
      .then((response) => response.json())
      .then((data) => setPopularWomen(data));
  }, []);

  // Animation variants remain great, no need to change the logic
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    // THEME CHANGE: Dark background for a premium feel
    <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#1a1a1a] text-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* THEME CHANGE: Updated header with new fonts and colors */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-center mb-16"
        >
          {/* THEME CHANGE: Using a more elegant serif font (add to your project) */}
          <h1 className="font-serif text-5xl max-sm:text-4xl text-white mb-4">
            Popular In <span className="text-amber-400">Women</span>
          </h1>
          {/* THEME CHANGE: A subtle, golden accent line */}
          <div className="flex justify-center">
            <div className="w-20 h-0.5 bg-amber-400 rounded-full mb-6"></div>
          </div>
          {/* THEME CHANGE: Softer subheading text */}
          <p className="text-gray-400 max-w-2xl mx-auto text-lg tracking-wide">
            Discover this season's most loved styles
          </p>
        </motion.div>

        {/* Product Grid - Structure is good, styling changes will be in the Item component */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 px-4"
        >
          {popularWomen.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariant}
              // THEME CHANGE: A slightly more subtle hover effect
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Item
                id={item._id}
                title={item.name}
                img={item.images[0]}
                price={item.price}
                // We will pass down new classes if needed, but it's better to style within Item.jsx
              />
            </motion.div>
          ))}
        </motion.div>

        {/* THEME CHANGE: Updated Call-to-Action button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-20"
        >
          <Link to={"/womens"}>
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
                View All Collection
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Popular;