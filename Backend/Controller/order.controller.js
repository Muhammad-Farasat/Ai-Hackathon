import User from '../Model/User.js'
import sendEmail from '../utils/email.js'
import Order from '../Model/Order.js'
import Cart from '../Model/Cart.js'

export const placeOrder = async (req, res) => {
  try {
    const { items, totalPrice, shippingAddress } = req.body;

    const userId = req.user.id;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items to order." });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newOrder = new Order({
      userId,
      items,
      totalPrice,
      shippingAddress
    });

    await newOrder.save();

    await Cart.deleteOne({ userId });
    
    // Email to user
    await sendEmail(user.email, newOrder);

    return res.status(200).json({ message: "Order placed successfully", order: newOrder });

  } catch (err) {

    console.error("Order placement failed:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getOrder = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("items.productId", "name price images");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({ message: "All orders retrieved successfully", orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ message: "Server error while retrieving orders" });
  }
}

export const updateOrderStatus = async (req, res) => {
  try {
    
    const { orderId, newStatus } = req.body;
    
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });
    
    // console.log(order);
    order.status = newStatus;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

