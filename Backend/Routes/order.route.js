import express from 'express'
import FetchUser from '../Middleware/FetchUser.js'
import { getOrder, placeOrder, updateOrderStatus } from '../Controller/order.controller.js'



const router = express.Router()

router.post('/place-order', FetchUser, placeOrder)
router.get('/get-order', getOrder)
router.post('/update-status', updateOrderStatus)


export default router
  