import React, { useEffect, useState } from "react";
import { Item } from "../Item/Item"; // Uses our already themed Item component
import { FaArrowRight } from "react-icons/fa"; // Using Fa for consistency
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NewCollection = () => {
  const [newCollection, setNewCollection] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/newCollection`)
      .then((response) => response.json())
      .then((data) => setNewCollection(data));
  }, []);

  // Animation variants - these are great, no changes needed
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
    // THEME CHANGE: Using a black background for contrast with the previous section
    <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-black text-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* THEME CHANGE: Updated header with our elegant theme */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-center mb-16"
        >
          {/* THEME CHANGE: Using Playfair Display font and golden accent */}
          <h1 className="font-serif text-5xl max-sm:text-4xl text-white mb-4">
            New <span className="text-amber-400">Collections</span>
          </h1>
          {/* THEME CHANGE: Consistent golden underline */}
          <div className="flex justify-center">
            <div className="w-20 h-0.5 bg-amber-400 rounded-full mb-6"></div>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg tracking-wide">
            Discover our latest arrivals for the season
          </p>
        </motion.div>

        {/* Product Grid - leverages our already themed <Item /> component */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 px-4"
        >
          {newCollection.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariant}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Item
                id={item._id}
                title={item.name}
                img={item.images[0]}
                price={item.price}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* THEME CHANGE: Themed CTA button, consistent with the 'Popular' section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-20"
        >
          {/* NOTE: Changed to a Link for better UX, pointing to the main shop page */}
          <Link to={"/"}>
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
                View All Collections
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NewCollection;