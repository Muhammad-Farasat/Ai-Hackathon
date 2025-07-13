import React, { createContext, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios';





export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

    const [all_product, setAll_Product] = useState([])
    const [cartItems, setCartItems] = useState({ items: [], totalPrice: 0 })
    const backend_url = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${backend_url}/allproduct`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setAll_Product(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();

        if (localStorage.getItem('auth-token')) {
            fetchCart();
        }

    }, []);


    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('auth-token');

            if (!token) {
                console.warn("No authentication token found");
                return null;
            }

            const response = await axios.get(`${backend_url}/get-cart`, {
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json'
                }
            });

            // Check for successful response
            if (response.status === 200 && response.data) {
                setCartItems(response.data)
                return cartItems
            } else {
                throw new Error("Invalid response from server");
            }

        } catch (error) {
            console.error("Error fetching cart:", error);

            // Handle specific error cases
            if (error.response) {

                console.error("Server responded with:", error.response.status);

                if (error.response.status === 401) {
                    console.warn("Unauthorized - Token may be invalid");
                }
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Request setup error:", error.message);
            }

            throw error;
        }
    };

    const addToCart = async (itemId, sizes) => {

        const newQuantity = (cartItems[itemId] || 0) + 1;
        // const product = all_product.find(p => { p.id === itemId });
        // console.log("This is P ID:- ", product);

        // if (!product) {
        //     toast.error("Product not found");
        //     return;
        // }

        if (localStorage.getItem('auth-token')) {
            try {
                const response = await fetch(`${backend_url}/add-cart`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'auth-token': localStorage.getItem('auth-token'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        itemId,
                        sizes,
                        quantity: newQuantity
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to add to cart');
                }

                setCartItems(prev => ({ ...prev, [itemId]: newQuantity }));
                await fetchCart()
                toast.success(`Added to cart!`);
            } catch (error) {
                console.error("Full error details:", error);
                toast.error(error.message || "Failed to add item to cart");
            }
        } else {
            // Local cart for unauthenticated users
            setCartItems(prev => ({ ...prev, [itemId]: newQuantity }));
            toast.success(`${product.name} added to cart!`);
        }
    };

   const removeFromCart = async (itemId, sizes) => {
    const currentItem = cartItems.items.find(item => item.productId === itemId && item.size === sizes);
    const currentQuantity = currentItem ? currentItem.quantity : 0;
    const newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 0;

    if (localStorage.getItem('auth-token')) {
        try {
            if (newQuantity > 0) {
                // Update quantity
                const response = await fetch(`${backend_url}/cart/${itemId}`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'auth-token': localStorage.getItem('auth-token'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ quantity: newQuantity })
                });

                if (!response.ok) throw new Error('Failed to update cart');

                await fetchCart(); // ✅ Refresh updated state
            } else {
                // Remove item completely
                const response = await fetch(`${backend_url}/cart/${itemId}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'auth-token': localStorage.getItem('auth-token'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ sizes })
                });

                if (!response.ok) throw new Error('Failed to remove from cart');

                await fetchCart(); // ✅ Refresh updated state
            }
        } catch (error) {
            console.error("Error removing/updating item:", error);
            toast.error(error.message || "Failed to update/remove item");
        }
    } else {
        // Local cart for unauthenticated users
        if (newQuantity > 0) {
            setCartItems(prev => ({ ...prev, [itemId]: newQuantity }));
        } else {
            setCartItems(prev => {
                const newCart = { ...prev };
                delete newCart[itemId];
                return newCart;
            });
        }
    }
};


    const clearCart = () => {
        if (localStorage.getItem('auth-token')) {
            fetch(`${backend_url}/delete-cart`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to clear cart');
                    }
                    setCartItems({});
                    toast.success('Cart cleared successfully');
                })
                .catch(error => {
                    console.error("Error clearing cart:", error)
                    toast.error("Failed to clear cart");
                })
        } else {
            setCartItems({});
        }
    }

    const getTotalItems = () => {
        // console.log("This is the total items: ",);

        return cartItems.items.length

    }

    const getTotalPrice = () => {
        return cartItems.totalPrice
    };

    const updateCart = async (itemId, newQuantity) => {
        try {
            // Validate quantity
            console.log();

            if (!Number.isInteger(newQuantity)) {
                throw new Error("Quantity must be an integer");
            }

            // Optimistic update - immediately update UI
            setCartItems(prev => ({
                ...prev,
                [itemId]: newQuantity
            }));

            if (localStorage.getItem('auth-token')) {
                const response = await fetch(`${backend_url}/cart/${itemId}`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'auth-token': localStorage.getItem('auth-token'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ quantity: newQuantity })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to update quantity');
                }

            }
        } catch (error) {
            console.error("Update quantity error:", error);
            toast.error(error.message);

            // Revert to previous state on error
            fetchCart(); // Refresh cart data from server
        }
    };

    const incrementQuantity = async (productId, sizes) => {
        try {
            const response = await fetch(`${backend_url}/increase`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, sizes }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Failed to increase quantity:', data.message || 'Unknown error');
                return;
            }

            console.log('Quantity increased successfully:', data);
            await fetchCart()

            // You can optionally return data here if needed
            return data;

        } catch (error) {
            console.error('Error while increasing quantity:', error.message);
        }
    };

    const decrementQuantity = async (productId, sizes) => {

        try {
            const response = await fetch(`${backend_url}/decrease`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, sizes }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Failed to increase quantity:', data.message || 'Unknown error');
                return;
            }

            console.log('Quantity increased successfully:', data);
            await fetchCart()

            return data;

        } catch (error) {
            console.error('Error while increasing quantity:', error.message);
        }

    }

    const placeOrder = async (items, totalPrice, shippingAddress) => {
        try {
            const response = await fetch(`${backend_url}/place-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token")
                },
                body: JSON.stringify({
                    items,
                    totalPrice,
                    shippingAddress
                })
            });

            if (response.ok) {
                toast.success("Order Placed Successfully..!")
                window.location.href = '/'
            }

        } catch (error) {
            console.log(error);
            toast.error("There was some issues..!")

        }

    }


    const contextValue = useMemo(() => ({

        all_product,
        cartItems,
        decrementQuantity,
        getTotalPrice,
        getTotalItems,
        incrementQuantity,
        addToCart,
        removeFromCart,
        clearCart,
        updateCart,
        fetchCart,
        placeOrder

    }), [all_product, cartItems])


    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider