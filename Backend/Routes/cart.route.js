import express from 'express';
import { getCart, addToCart, removeFromCart, updateQuantity, clearCart, IncreaseNumberOfItem, DecreaseNumberOfItem } from '../Controller/cart.controller.js';
import FetchUser from '../Middleware/FetchUser.js'



const router = express.Router();

router.get('/get-cart',FetchUser, getCart)
router.post('/add-cart',FetchUser, addToCart )
router.delete('/delete-cart',FetchUser, clearCart)

router.post('/cart/:productId', FetchUser, removeFromCart)
router.put('/cart/:productId', FetchUser, updateQuantity)
router.post('/increase', FetchUser, IncreaseNumberOfItem)

router.post('/decrease', FetchUser, DecreaseNumberOfItem)



export default router;