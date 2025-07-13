import React, { useContext, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { FiChevronLeft, FiChevronRight, FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import RelatedProducts from '../RelatedProducts/RelatedProducts'; // Assuming this is also themed

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const images = product?.images || [product?.image].filter(Boolean);
    const sizes = product?.sizes || ['S', 'M', 'L', 'XL', 'XXL'];

    if (!product) {
        // THEME CHANGE: Themed loading/error state
        return (
            <div className="flex items-center justify-center h-screen bg-black text-gray-400">
                <p className="text-xl">Loading Product Details...</p>
            </div>
        );
    }

    const nextImage = () => setCurrentImageIndex((p) => (p + 1) % images.length);
    const prevImage = () => setCurrentImageIndex((p) => (p - 1 + images.length) % images.length);

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error('Please select a size first');
            return;
        }
        if (!localStorage.getItem('auth-token')) {
            toast.error("Please log in to add items to your cart.");
            return;
        }
        
        setIsAddingToCart(true);
        addToCart(product._id, selectedSize); 
        // Note: The toast.success for adding to cart should be in your addToCart context function
        setTimeout(() => setIsAddingToCart(false), 1000);
    };

    return (
        <>
            {/* THEME CHANGE: Dark, premium background */}
            <section className="min-h-screen bg-black pt-24 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col lg:flex-row gap-12 lg:gap-16"
                    >
                        {/* Image Gallery */}
                        <div className="lg:w-1/2 flex flex-col">
                            <div className="relative bg-[#1a1a1a] rounded-lg overflow-hidden aspect-square border border-gray-800">
                                <motion.img
                                    key={currentImageIndex}
                                    src={images[currentImageIndex]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    initial={{ opacity: 0.5 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4, ease: 'easeOut' }}
                                />
                                {images.length > 1 && (
                                    <>
                                        {/* THEME CHANGE: Themed gallery arrows */}
                                        <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/80 transition-all"><FiChevronLeft size={24} /></button>
                                        <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/80 transition-all"><FiChevronRight size={24} /></button>
                                    </>
                                )}
                            </div>

                            {/* THEME CHANGE: Themed Thumbnails */}
                            {images.length > 1 && (
                                <div className="grid grid-cols-5 gap-3 mt-4">
                                    {images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`aspect-square rounded-md overflow-hidden border-2 transition-all duration-200 ${currentImageIndex === index ? 'border-amber-400' : 'border-gray-800 hover:border-gray-600'}`}
                                        >
                                            <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="lg:w-1/2 text-white">
                            {/* THEME CHANGE: Elegant serif title */}
                            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-4xl lg:text-5xl font-serif font-bold mb-4">
                                {product.name}
                            </motion.h1>
                            
                            {/* THEME CHANGE: Golden price */}
                            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }} className="flex items-center mb-6">
                                <span className="text-3xl font-sans font-semibold text-amber-400">PKR {product.price.toLocaleString()}</span>
                            </motion.div>

                            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-gray-400 mb-8 leading-relaxed font-sans">
                                {product.description || "Premium quality product designed for comfort and style. Perfect for everyday wear with exceptional durability."}
                            </motion.p>

                            {/* THEME CHANGE: Themed Size Selection */}
                            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }} className="mb-8">
                                <h3 className="text-lg font-medium text-gray-200 mb-3 font-sans">Select Size</h3>
                                <div className="flex flex-wrap gap-3">
                                    {sizes.map((size) => (
                                        <motion.button
                                            key={size} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-5 py-2 rounded-full border-2 text-sm font-medium transition-all duration-200 ${selectedSize === size
                                                ? 'bg-amber-400 text-black border-amber-400'
                                                : 'bg-transparent border-gray-600 text-gray-300 hover:border-amber-400 hover:text-amber-400'}`}
                                        >
                                            {size}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>

                            {/* THEME CHANGE: Themed Add to Cart Button */}
                            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                                <motion.button
                                    onClick={handleAddToCart} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                    disabled={isAddingToCart}
                                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-amber-400 text-black font-bold rounded-lg transition-all duration-300 hover:bg-amber-300 disabled:bg-amber-600 disabled:cursor-wait"
                                >
                                    <FiShoppingCart />
                                    {isAddingToCart ? 'ADDING TO CART...' : 'ADD TO CART'}
                                </motion.button>
                            </motion.div>

                            {/* THEME CHANGE: Themed Product Details */}
                            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }} className="mt-10 pt-6 border-t border-gray-800 font-sans">
                                <h3 className="text-base font-semibold text-gray-200 mb-3 uppercase tracking-wider">Details</h3>
                                <div className="text-gray-400">
                                    <span className="font-medium text-gray-300">Category:</span> {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
            
            {/* The RelatedProducts component should also ideally use the dark theme for consistency */}
            <RelatedProducts category={product.category} />
        </>
    );
};

export default ProductDisplay;