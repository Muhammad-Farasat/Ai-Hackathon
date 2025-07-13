import React, { useEffect, useState } from "react";
import EditModal from "../Components/EditModal/EditModal"; // Note: This component will also need to be themed
import { MdDelete, MdEdit } from "react-icons/md";
import { FiSearch, FiRefreshCw } from "react-icons/fi";
import Loader from '../Components/Loader/loader';
import { motion } from 'framer-motion';

function ListProduct() {
  const [allProduct, setAllProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Your component logic is solid and doesn't need changes.
  // We'll focus purely on the JSX and styling.
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const filteredProducts = allProduct.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateProductInState = (updatedProduct) => {
    setAllProduct(prevProducts =>
      prevProducts.map(p => p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p)
    );
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const fetchInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backend_url}/allproduct`);
      const data = await response.json();
      if (response.ok) {
        setAllProduct(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const remove_product = async (id) => {
    await fetch(`${backend_url}/removeproduct`, {
      method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }),
    });
    setAllProduct(prev => prev.filter(p => p.id !== id));
  };

  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto' };
  }, [isModalOpen]);

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    // THEME CHANGE: Main container with dark theme and proper padding for sidebar
    <div className="min-h-screen w-full bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 pl-72 max-lg:pl-28 max-md:pl-24 text-white">
      <div className="max-w-4xl mx-auto">
        {/* THEME CHANGE: Themed Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-serif font-bold mb-2">Product Inventory</h1>
          <p className="text-gray-400">Manage, edit, and view all product listings.</p>
        </div>

        {/* THEME CHANGE: Themed Search and Filter Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <FiSearch className="absolute inset-y-0 left-3 flex items-center text-gray-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name or category..."
              className="block w-full pl-10 pr-3 py-2.5 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400 placeholder-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={fetchInfo} className="px-4 py-2.5 bg-gray-800 border border-gray-700 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors flex items-center gap-2">
            <FiRefreshCw className={`transition-transform ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader /></div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#1a1a1a] rounded-lg border border-gray-800"><p className="text-gray-500">No products found matching your search.</p></div>
        ) : (
          // THEME CHANGE: Themed table container
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#1a1a1a] shadow-2xl overflow-hidden rounded-lg border border-gray-800">
            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-12 bg-black/20 px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <div className="col-span-5">Product</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-3 text-right">Actions</div>
            </div>

            <div className="divide-y divide-gray-800">
              {filteredProducts.map((product) => (
                <div key={product.id} className="grid grid-cols-1 sm:grid-cols-12 px-6 py-4 hover:bg-gray-800/50 transition-colors items-center">
                  <div className="flex items-center col-span-12 sm:col-span-5">
                    <img src={product.images[0]} className="w-16 h-16 object-cover rounded-md mr-4 shrink-0" alt={product.name} />
                    <h3 className="font-medium text-gray-100">{product.name}</h3>
                  </div>
                  <div className="flex items-center col-span-6 sm:col-span-2 mt-2 sm:mt-0">
                    <span className="px-2 py-1 text-xs rounded-full bg-amber-400/10 text-amber-400 capitalize">{product.category}</span>
                  </div>
                  <div className="flex items-center col-span-6 sm:col-span-2 mt-2 sm:mt-0 font-medium text-gray-300">
                    PKR {product.price.toLocaleString()}
                  </div>
                  <div className="col-span-12 sm:col-span-3 flex justify-end items-center space-x-2 mt-3 sm:mt-0">
                    <button onClick={() => handleEditClick(product)} className="p-2 text-gray-400 hover:text-amber-400 hover:bg-gray-800 rounded-md transition-colors" title="Edit">
                      <MdEdit className="text-xl" />
                    </button>
                    <button onClick={() => remove_product(product.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-800 rounded-md transition-colors" title="Delete">
                      <MdDelete className="text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Edit Modal - Remember to theme this component as well! */}
      {isModalOpen && (
        <EditModal
          product={selectedProduct}
          onSave={updateProductInState}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default ListProduct;