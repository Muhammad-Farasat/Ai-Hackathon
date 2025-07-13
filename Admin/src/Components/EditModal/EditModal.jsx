import React, { useState, useEffect } from 'react'

const EditModal = ({ product, onClose, onSave }) => {
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedCategory, setUpdatedCategory] = useState('');

  useEffect(() => {
    if (product) {
      setUpdatedName(product.name);
      setUpdatedPrice(product.price);
      setUpdatedCategory(product.category);
    }
  }, [product]);

  const handleSave = async () => {
    const updatedProduct = {
      ...product,
      name: updatedName,
      price: updatedPrice,
      category: updatedCategory,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/updateproduct`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        const updated = await response.json();
        onSave(updated); 
        onClose();      
      } else {
        console.error("Failed to update product");
      }
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 mx-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Edit Product</h2>
        
        <div className="space-y-4">
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            placeholder="Product Name"
            className="w-full h-12 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            value={updatedPrice}
            onChange={(e) => setUpdatedPrice(e.target.value)}
            placeholder="Product Price"
            className="w-full h-12 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={updatedCategory}
            onChange={(e) => setUpdatedCategory(e.target.value)}
            className="w-full h-12 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>

          <button
            onClick={handleSave}
            className="w-full h-12 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Save Changes
          </button>

          <button
            onClick={onClose}
            className="w-full h-12 bg-gray-200 text-gray-700 font-medium rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal