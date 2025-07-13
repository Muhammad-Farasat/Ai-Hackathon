import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiPlus, FiMinus, FiArrowRight } from 'react-icons/fi';
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const CartItems = () => {
  const { 
    cartItems,
    incrementQuantity,
    decrementQuantity,
    removeFromCart, 
    clearCart,
    getTotalPrice
  } = useContext(ShopContext) || {};

  const items = cartItems?.items || [];
  const totalPrice = getTotalPrice ? getTotalPrice() : 0;

  if (!useContext(ShopContext)) {
    return <div className="bg-black min-h-screen flex items-center justify-center text-gray-400">Loading Cart...</div>;
  }

  return (
    <div className="bg-black min-h-screen text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto max-w-4xl"
      >
        {/* THEME CHANGE: Themed Heading */}
        <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-10 text-center">
          My <span className="text-amber-400">Bag</span>
        </h1>

        {/* THEME CHANGE: Themed Empty Cart State */}
        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className="text-xl text-gray-400 mb-6">Your shopping bag is currently empty.</p>
            <Link to={'/'}>
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
                      Continue Shopping <FiArrowRight />
                  </span>
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="lg:grid lg:grid-cols-3 lg:gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((product) => (
                  <motion.div
                    key={`${product.productId._id}-${product.sizes}`}
                    layout initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
                    // THEME CHANGE: Themed Item Card
                    className="grid grid-cols-12 gap-4 bg-[#1a1a1a] p-4 rounded-lg border border-gray-800 items-center"
                  >
                    <div className="col-span-3">
                      <img className="w-full h-auto object-cover rounded-md aspect-square" src={product.images || '/placeholder-product.jpg'} alt={product.name} />
                    </div>

                    <div className="col-span-5 space-y-1">
                      <h2 className="font-semibold text-gray-100">{product.name}</h2>
                      <p className="text-sm text-gray-400">Size: {product.sizes}</p>
                      <p className="text-md font-semibold text-amber-400">PKR {(product.price * product.quantity).toLocaleString()}</p>
                    </div>

                    <div className="col-span-4 flex flex-col items-end justify-between h-full">
                      {/* THEME CHANGE: Themed Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <motion.button whileTap={{ scale: 0.9 }} onClick={() => decrementQuantity(product.productId._id, product.sizes)} className="p-1.5 bg-gray-800 rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled={product.quantity <= 1}><FiMinus /></motion.button>
                        <span className="font-semibold w-6 text-center">{product.quantity}</span>
                        <motion.button whileTap={{ scale: 0.9 }} onClick={() => incrementQuantity(product.productId._id, product.sizes)} className="p-1.5 bg-gray-800 rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled={product.quantity >= product.stock}><FiPlus /></motion.button>
                      </div>
                      
                      {/* THEME CHANGE: Themed Remove Button */}
                      <motion.button whileHover={{ scale: 1.1, color: '#ef4444' }} whileTap={{ scale: 0.9 }} onClick={() => {removeFromCart(product.productId._id, product.sizes); toast.success(`${product.name} removed`);}} className="text-gray-600 transition-colors"><FiTrash2 size={18} /></motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-1 mt-8 lg:mt-0 sticky top-28">
              {/* THEME CHANGE: Themed Summary Card */}
              <div className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-800">
                <h2 className="text-xl font-bold mb-5 border-b border-gray-700 pb-4">Order Summary</h2>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between"><span className="text-gray-400">Subtotal</span><span>PKR {totalPrice.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Shipping</span><span>Free</span></div>
                </div>
                <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-amber-400">PKR {totalPrice.toLocaleString()}</span>
                </div>

                <div className="flex flex-col gap-3 mt-6">
                  {/* THEME CHANGE: Themed Primary Button */}
                  <Link to={'/checkout'} className="w-full">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-3 bg-amber-400 text-black font-bold rounded-lg hover:bg-amber-300 transition-all">
                      Proceed to Checkout
                    </motion.button>
                  </Link>

                  {/* THEME CHANGE: Themed Secondary Button */}
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { clearCart(); toast.success("Cart cleared"); }} className="w-full py-3 bg-transparent text-gray-400 font-medium rounded-lg hover:bg-gray-800 transition-colors border border-gray-700">
                    Clear Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CartItems;