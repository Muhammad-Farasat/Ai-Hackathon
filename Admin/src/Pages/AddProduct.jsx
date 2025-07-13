import React, { useState } from 'react';
import { Modal } from 'antd';
import Loader from '../Components/Loader/loader'; // Assuming this component is theme-agnostic
import { FiUpload, FiPlusCircle, FiImage } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { motion } from 'framer-motion';

function AddProduct() {
    const [productDetail, setProductDetail] = useState({
        name: "", category: "", price: "", images: [], sizes: [],
    });
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState([]);

    // Your component logic (changeHandler, Add_Product, etc.) is excellent and requires no changes.
    // I will keep your logic exactly as is.
    const changeHandler = (e) => {
        const { name, files, value } = e.target;
        if (name === 'images' && files && files.length > 0) {
            let selectedFiles = Array.from(files);
            const previews = selectedFiles.map(file => URL.createObjectURL(file));
            setImagePreview(prev => [...prev, ...previews]);
            setProductDetail(prev => ({ ...prev, images: [...prev.images, ...selectedFiles] }));
        } else {
            setProductDetail({ ...productDetail, [name]: value });
        }
    };

    const Add_Product = async () => {
        setLoading(true);
        try {
            const imageUrls = [];
            for (const file of productDetail.images) {
                const formData = new FormData();
                formData.append('images', file);
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload`, { method: 'POST', body: formData });
                const data = await response.json();
                if (data.success && data.image_url) {
                    imageUrls.push(data.image_url[0].url);
                } else {
                    throw new Error("Image upload failed");
                }
            }
            const product = {
                name: productDetail.name, category: productDetail.category,
                price: Number(productDetail.price), sizes: productDetail.sizes, images: imageUrls
            };
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/addProduct`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(product)
            });
            const result = await response.json();
            if (result.success) {
                success(); formReset();
            } else {
                error(result.message || "Failed to add product");
            }
        } catch (err) {
            error(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const removeImage = (index) => {
        setImagePreview(prev => prev.filter((_, i) => i !== index));
        setProductDetail(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    };

    const formReset = () => {
        setProductDetail({ name: "", category: "", price: "", images: [], sizes: [] });
        setImagePreview([]);
    };

    const success = () => Modal.success({ title: 'Success!', content: 'Product Added Successfully' });
    const error = (msg) => Modal.error({ title: 'Error Occurred', content: msg });
    
    // A reusable class string for our themed inputs
    const inputClasses = "mt-1 block w-full bg-gray-800 px-4 py-2.5 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400";

    return (
        // THEME CHANGE: Main container with dark background and padding to account for sidebar
        <div className="min-h-screen w-full bg-gray-900 flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8 pl-72 max-lg:pl-28 max-md:pl-24">
            <div className="w-full max-w-2xl space-y-8">
                {/* THEME CHANGE: Themed Header */}
                <div className="text-center">
                    <h2 className="mt-6 text-4xl font-serif font-bold text-white">Add New Product</h2>
                    <p className="mt-2 text-sm text-gray-400">Fill in the details to add an item to the store catalog.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12"><Loader /></div>
                ) : (
                    // THEME CHANGE: Themed form container card
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#1a1a1a] border border-gray-800 shadow-2xl rounded-lg p-8 space-y-6">
                        {/* THEME CHANGE: Themed input fields */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-400">Product Name</label>
                            <input id="name" name="name" type="text" required value={productDetail.name} onChange={changeHandler} className={inputClasses} placeholder="e.g. Premium Silk Anarkali" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-400">Price</label>
                                <div className="mt-1 relative rounded-md">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-gray-500">PKR</span></div>
                                    <input id="price" name="price" type="number" value={productDetail.price} onChange={changeHandler} className={`${inputClasses} pl-12`} placeholder="0.00" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-400">Category</label>
                                <select id="category" name="category" value={productDetail.category} onChange={changeHandler} className={inputClasses}>
                                    <option value="" disabled>Select a category</option>
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>
                                    <option value="kid">Kids</option>
                                </select>
                            </div>
                        </div>

                        {/* THEME CHANGE: Themed Size Selector */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Available Sizes</label>
                            <div className="flex flex-wrap gap-2 mb-3 min-h-[36px]">
                                {productDetail.sizes?.map((size, index) => (
                                    <div key={index} className="flex items-center bg-amber-400/10 text-amber-400 px-3 py-1 rounded-full text-sm">
                                        <span>{size}</span>
                                        <button type="button" onClick={() => setProductDetail(p => ({ ...p, sizes: p.sizes.filter((_, i) => i !== index) }))} className="ml-2 text-amber-300 hover:text-white">×</button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                    <button key={size} type="button" onClick={() => !productDetail.sizes?.includes(size) && setProductDetail(p => ({ ...p, sizes: [...(p.sizes || []), size] }))} className={`px-4 py-1.5 text-sm rounded-md border ${productDetail.sizes?.includes(size) ? 'bg-gray-700 text-gray-500 cursor-not-allowed border-gray-700' : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'}`} disabled={productDetail.sizes?.includes(size)}>
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* THEME CHANGE: Themed Image Uploader */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400">Product Images</label>
                            <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                {imagePreview.map((preview, index) => (
                                    <div key={index} className="relative aspect-square">
                                        <img src={preview} alt={`Preview ${index}`} className="h-full w-full object-cover rounded-md" />
                                        <button type="button" onClick={() => removeImage(index)} className="absolute -top-1 -right-1 bg-black/50 backdrop-blur-sm text-white rounded-full p-1 leading-none hover:bg-red-500/80 transition-all"><RxCross2 size={12} /></button>
                                    </div>
                                ))}
                                <label htmlFor="images" className="flex flex-col items-center justify-center w-full aspect-square border-2 border-gray-700 border-dashed rounded-md cursor-pointer hover:bg-gray-800 hover:border-gray-600 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
                                        <FiUpload className="w-8 h-8 mb-2" />
                                        <p className="text-xs text-center">Add Images</p>
                                    </div>
                                    <input id="images" name="images" type="file" onChange={changeHandler} className="sr-only" accept="image/*" multiple />
                                </label>
                            </div>
                        </div>

                        {/* THEME CHANGE: Primary Action Button */}
                        <div className="pt-4">
                            <button type="button" onClick={Add_Product} disabled={loading || !productDetail.name || !productDetail.price || !productDetail.category || productDetail.images.length === 0}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-black bg-amber-400 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 transition-all">
                                <FiPlusCircle className="mr-2 h-5 w-5" />
                                {loading ? 'Uploading...' : 'Add Product to Store'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default AddProduct;