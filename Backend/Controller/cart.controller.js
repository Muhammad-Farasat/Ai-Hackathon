import Cart from '../Model/Cart.js';
import Product from '../Model/Product.js';


const calculateTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId', 'name price images stock');

    if (!cart) {
      cart = await Cart.create({
        userId: req.user._id,
        items: [],
        totalPrice: 0
      });
    }

    res.status(200).json({
      items: cart.items,
      totalPrice: cart.totalPrice,
      message: "Cart retrieved successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get cart",
      error: error.message
    });
  }
};

// Add/Update item in cart
export const addToCart = async (req, res) => {

  const { itemId, sizes, quantity = 1 } = req.body;
  const userId = req.user.id

  try {


    const product = await Product.findById(itemId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId: req.user.id });
    
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [], totalPrice: 0 });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === itemId &&
      item.sizes === sizes
    );

    if (existingItemIndex >= 0) {
      // Update existing item quantity
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;

      // if (newQuantity > product.stock) {
      //   return res.status(400).json({
      //     message: `Cannot add more than ${product.stock} items`
      //   });
      // }

      cart.items[existingItemIndex].quantity = newQuantity;

      

    } else {
      // Add new item to cart
      cart.items.push({
        productId: itemId,
        name: product.name,
        price: product.price,
        sizes,
        images: product.images[0],
        quantity,
      });
    }

    // Update total price and save
    cart.totalPrice = calculateTotal(cart.items);
    await cart.save();

    res.status(200).json({
      message: "Product added to cart",
      cart: {
        items: cart.items,
        totalPrice: cart.totalPrice,
        images: cart.images
      }
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to update cart",
      error: error.message
    });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const {sizes} = req.body
  console.log(req.body);
  
  try {
    const userId = req.user.id
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(item =>
       item.productId.toString() === productId &&
       item.sizes === sizes
  );
    // console.log(cart.items.findIndex(item => item.productId.toString() === productId));

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart"
      });
    }

    cart.items.splice(itemIndex, 1)

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    );

    await cart.save();

    // Populate fresh data
    const updatedCart = await Cart.populate(cart, { path: 'items.productId' });

    return res.status(200).json({
      success: true,
      message: "Item quantity updated",
      cart: updatedCart
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to remove item",
      error: error.message
    });
  }
};

// Update item quantity
export const updateQuantity = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    // Validate quantity
    if (!Number.isInteger(quantity)) {
      return res.status(400).json({ message: "Quantity must be an integer" });
    }

    // Find cart and item
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Check product stock
    const product = await Product.findById(productId);
    if (quantity > product.stock) {
      return res.status(400).json({
        message: `Only ${product.stock} items available in stock`
      });
    }

    // Update quantity
    cart.items[itemIndex].quantity = quantity;
    cart.totalPrice = calculateTotal(cart.items);
    await cart.save();

    res.status(200).json({
      message: "Quantity updated",
      cart: {
        items: cart.items,
        totalPrice: cart.totalPrice
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update quantity",
      error: error.message
    });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { $set: { items: [], totalPrice: 0 } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({
      message: "Cart cleared successfully",
      cart: {
        items: cart.items,
        totalPrice: cart.totalPrice
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to clear cart",
      error: error.message
    });
  }
};

export const IncreaseNumberOfItem = async (req, res) => {

  try {
    
    const { productId, sizes } = req.body
    
    const userId = req.user.id
    console.log("This is item", userId);

    const cart = await Cart.findOne({ userId })

    if (!cart) {
      return res.status(400).json({ message: "Cart not found" })
    }

    const item = cart.items.find((item) => item.productId.toString() === productId && item.sizes === sizes)

    if (!item) {
      return res.status(400).json({ error: "Item not found in cart" });
    }

    item.quantity += 1

    cart.totalPrice = cart.items.reduce((total, item) =>
      total + (item.price * item.quantity), 0);

    await cart.save();

    res.status(200).json({
      success: true,
      cart: await Cart.populate(cart, { path: 'items.productId' })
    });

  } catch (error) {

    console.error("Error increasing cart:", error);

    res.status(500).json({
      success: false,
      message: "Server error while increasing cart",
      error: error.message
    });

  }
}

export const DecreaseNumberOfItem = async (req, res) => {

  try {

    const { productId } = req.body

    const userId = req.user.id

    const cart = await Cart.findOne({ userId })
    
    if (!cart) {
      return res.status(400).json({ message: "Cart not found" })
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId)
    

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart"
      });
    }

    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1

      cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

      await cart.save();

      const updatedCart = await Cart.populate(cart, { path: 'items.productId' });
      
      return res.status(200).json({
        success: true,
        message: "Item quantity updated",
        cart: updatedCart
      });

    }

    return res.status(200).json({
      success: true,
      message: "Minimum quantity reached (1)",
      cart: await Cart.populate(cart, { path: 'items.productId' })
    });


  } catch (error) {

    console.error("Error decreasing cart:", error);

    res.status(500).json({
      success: false,
      message: "Server error while decreasing cart",
      error: error.message
    });

  }
}