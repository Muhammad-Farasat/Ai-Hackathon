import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { FiCreditCard, FiTruck, FiLock } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, placeOrder, getTotalPrice } = useContext(ShopContext);

  const [shippingAddress, setShippingAddress] = useState({
    firstName: '', lastName: '', address: '', city: '', zipCode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const subtotal = getTotalPrice() || 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
    // Basic validation
    if (Object.values(shippingAddress).some(field => field === '')) {
      // In a real app, you'd show a toast notification
      alert("Please fill in all shipping details.");
      return;
    }
    placeOrder(cartItems.items, total, shippingAddress);
  };

  // Custom scrollbar style for the product list
  const scrollbarStyle = `
    .product-list::-webkit-scrollbar { width: 6px; }
    .product-list::-webkit-scrollbar-track { background: #2a2a2a; border-radius: 10px; }
    .product-list::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 10px; }
    .product-list::-webkit-scrollbar-thumb:hover { background: #6b7280; }
  `;

  return (
    // THEME CHANGE: Dark background and page structure
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <style>{scrollbarStyle}</style>
      <div className="max-w-5xl mx-auto">
        
        {/* THEME CHANGE: Themed Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold">Secure Checkout</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Left Column - Forms */}
          <div className="lg:col-span-3 space-y-8">
            {/* THEME CHANGE: Themed Shipping Card */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-[#1a1a1a] p-6 lg:p-8 rounded-lg border border-gray-800">
              <div className="flex items-center mb-6">
                <div className="bg-amber-400/10 text-amber-400 p-3 rounded-full mr-4"><FiTruck size={20} /></div>
                <h2 className="text-xl font-semibold text-gray-100">Shipping Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
                {/* Reusable Input Component would be ideal here, but for now, we style directly */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">First Name</label>
                  <input type="text" value={shippingAddress.firstName} onChange={handleInputChange} name='firstName' className="w-full bg-gray-900 px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
                  <input type="text" value={shippingAddress.lastName} onChange={handleInputChange} name='lastName' className="w-full bg-gray-900 px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Address</label>
                  <input type="text" value={shippingAddress.address} onChange={handleInputChange} name='address' className="w-full bg-gray-900 px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">City</label>
                  <input type="text" value={shippingAddress.city} onChange={handleInputChange} name='city' className="w-full bg-gray-900 px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">ZIP Code</label>
                  <input type="text" value={shippingAddress.zipCode} onChange={handleInputChange} name='zipCode' className="w-full bg-gray-900 px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400" />
                </div>
              </div>
            </motion.div>

            {/* THEME CHANGE: Themed Payment Card */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-[#1a1a1a] p-6 lg:p-8 rounded-lg border border-gray-800">
              <div className="flex items-center mb-6">
                <div className="bg-amber-400/10 text-amber-400 p-3 rounded-full mr-4"><FiCreditCard size={20} /></div>
                <h2 className="text-xl font-semibold text-gray-100">Payment Details</h2>
              </div>
              <p className="text-center text-gray-400 p-4 border border-dashed border-gray-700 rounded-md">
                This is a demo. Payment processing is not live.
              </p>
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-800 h-fit sticky top-28">
              <h2 className="text-xl font-semibold mb-5 border-b border-gray-700 pb-4">Your Order</h2>
              <div className="product-list space-y-4 mb-5 max-h-60 overflow-y-auto pr-2">
                {cartItems?.items?.length > 0 ? (
                  cartItems.items.map(product => (
                    <div key={product._id} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-900 rounded-lg overflow-hidden shrink-0"><img src={product.images} alt={product.name} className="w-full h-full object-cover" /></div>
                      <div className="flex-1"><h3 className="font-medium text-sm text-gray-200">{product.name}</h3><p className="text-xs text-gray-400">Qty: {product.quantity}</p></div>
                      <p className="font-medium text-sm text-gray-300">PKR {(product.price * product.quantity).toLocaleString()}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">Your cart is empty. <Link to="/" className="text-amber-400 hover:underline">Go shopping</Link></p>
                )}
              </div>
              <div className="space-y-2 border-t border-gray-700 pt-4 text-sm">
                <div className="flex justify-between text-gray-300"><span>Subtotal</span><span>PKR {subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-gray-300"><span>Shipping</span><span>Free</span></div>
                <div className="flex justify-between text-gray-300"><span>Tax (8%)</span><span>PKR {tax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></div>
                <div className="flex justify-between font-bold text-lg pt-2 mt-2 border-t border-gray-700"><span>Total</span><span className="text-amber-400">PKR {total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></div>
              </div>
              
              <motion.button onClick={handlePlaceOrder} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full mt-6 bg-amber-400 text-black py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-amber-300 transition-all text-base">
                <FiLock /> Place Secure Order
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;