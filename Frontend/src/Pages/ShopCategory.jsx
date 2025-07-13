import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Added for better navigation
import { ShopContext } from "../Context/ShopContext";
import { Item } from "../Components/Item/Item"; // Uses our themed Item component
import Footer from "../Components/Footer/Footer"; // Uses our themed Footer
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa"; // Using a more appropriate icon for "Back"

function ShopCategory(props) {
  const { all_product } = useContext(ShopContext);
  const topRef = useRef(null);

  // Scroll to top on category change - your logic is perfect
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [props.category]);

  // Filter products by category
  const categoryProducts = all_product.filter(item => props.category === item.category);

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
    // THEME CHANGE: Using bg-black for the entire page wrapper for a seamless dark theme
    <div className="min-h-screen flex flex-col bg-black">
      <div ref={topRef} />

      <main className="flex-1">
        {/* THEME CHANGE: Section background and padding adjusted */}
        <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* THEME CHANGE: Themed Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="text-center mb-16"
            >
              <h1 className="font-serif text-5xl lg:text-6xl text-white mb-4">
                The <span className="text-amber-400">{props.category.charAt(0).toUpperCase() + props.category.slice(1)}</span> Collection
              </h1>
              <div className="flex justify-center">
                <div className="w-20 h-0.5 bg-amber-400 rounded-full mb-6"></div>
              </div>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg tracking-wide">
                Showing {categoryProducts.length} premium items curated just for you
              </p>
            </motion.div>

            {/* Product Grid */}
            {categoryProducts.length > 0 ? (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10"
              >
                {categoryProducts.map((item, i) => (
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
            ) : (
              // THEME CHANGE: Themed "No products" message
              <div className="text-center py-16">
                <p className="text-gray-300 text-xl mb-4">No products found in this category yet.</p>
                <p className="text-gray-500">Please check back later or explore our other collections.</p>
                <Link to="/" className="mt-6 inline-block text-amber-400 hover:underline">
                  Go to Homepage
                </Link>
              </div>
            )}

            {/* THEME CHANGE: Themed "Load More" or "Back" button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center mt-20"
            >
                <Link to="/" className="
                    inline-flex items-center gap-2 px-6 py-2
                    font-sans text-sm text-amber-400/80
                    border border-amber-400/50 rounded-full
                    transition-all duration-300
                    hover:text-amber-400 hover:border-amber-400 hover:bg-amber-400/10
                ">
                    <FaArrowLeft />
                    <span>Back to All Collections</span>
                </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ShopCategory;