import React, { useContext } from 'react';
import { Item } from '../Item/Item'; // Our already themed Item component
import { ShopContext } from '../../Context/ShopContext';
import { motion } from 'framer-motion';

const RelatedProducts = ({ category }) => {
    const { all_product } = useContext(ShopContext);

    // Get up to 4 related products from the same category
    const relatedProducts = all_product
        .filter((product) => product.category === category)
        .slice(0, 4);

    // Animation variants are perfect, no changes needed
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariant = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    // UX Improvement: Don't render the section if there are no related products
    if (relatedProducts.length === 0) {
        return null;
    }

    return (
        // THEME CHANGE: Dark charcoal background for a cohesive but distinct section
        <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#1a1a1a]">
            <div className="max-w-7xl mx-auto">
                {/* THEME CHANGE: Themed header with more inviting text */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="text-center mb-16"
                >
                    <h1 className="font-serif text-4xl lg:text-5xl text-white mb-4">
                        You Might Also Like
                    </h1>
                    <div className="flex justify-center">
                        <div className="w-20 h-0.5 bg-amber-400 rounded-full"></div>
                    </div>
                </motion.div>

                {/* Product Grid - leverages our themed Item component */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10"
                >
                    {relatedProducts.map((item, i) => (
                        <motion.div 
                            key={i}
                            variants={itemVariant}
                            // Consistent hover animation
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
            </div>
        </section>
    );
};

export default RelatedProducts;