import React, { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import Loader from "../Components/Loader/loader";
import { FiInbox } from "react-icons/fi";
import { motion } from 'framer-motion';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const backend_url = import.meta.env.VITE_BACKEND_URL;

    // Your business logic for fetching and updating orders is solid.
    // We will keep it exactly as is.
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${backend_url}/get-order`, { headers: { "auth-token": localStorage.getItem("auth-token") } });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message || "Failed to fetch orders");
                setOrders(data.orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [backend_url]);

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`${backend_url}/update-status`, {
                method: "POST", headers: { "Content-Type": "application/json", "auth-token": localStorage.getItem("auth-token") },
                body: JSON.stringify({ orderId, newStatus })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
            toast.success("Order status updated!");
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    // A helper to get status-specific colors for the dropdown
    const getStatusClasses = (status) => {
        switch (status) {
            case 'Delivered':
                return 'bg-green-500/10 text-green-400 border-green-500/30';
            case 'Pending':
                return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
            default:
                return 'bg-gray-800 text-gray-300 border-gray-700';
        }
    };

    if (loading) {
        return <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center"><Loader /></div>;
    }

    return (
        // THEME CHANGE: Main container with dark theme and proper padding
        <div className="min-h-screen w-full bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-serif font-bold text-white mb-10 text-center">Order Management</h1>

            {orders.length === 0 ? (
                // THEME CHANGE: Themed empty state
                <div className="text-center py-20 bg-[#1a1a1a] rounded-lg border border-gray-800 text-gray-500">
                    <FiInbox className="mx-auto mb-4 w-12 h-12" />
                    <p className="text-lg">No orders have been placed yet.</p>
                </div>
            ) : (
                // THEME CHANGE: Themed table container
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-x-auto rounded-lg shadow-2xl border border-gray-800 bg-[#1a1a1a]">
                    <table className="min-w-full divide-y divide-gray-800 text-sm">
                        <thead className="bg-black/20 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Items</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-amber-400 whitespace-nowrap">#{order._id.slice(-6)}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-200">{order.userId?.name}</div>
                                        <div className="text-xs text-gray-500">{order.userId?.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-300">
                                        <ul className="list-disc list-inside space-y-1">
                                            {order.items.map((item, idx) => (
                                                <li key={idx}>
                                                    {item.productId?.name} × {item.quantity}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="px-6 py-4 text-amber-400 font-semibold whitespace-nowrap">
                                        PKR {order.totalPrice.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                            // THEME CHANGE: Themed and status-aware select dropdown
                                            className={`px-3 py-1.5 rounded-md border text-xs font-medium focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all ${getStatusClasses(order.status)}`}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            )}
        </div>
    );
};

export default Orders;