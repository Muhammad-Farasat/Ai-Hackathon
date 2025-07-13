import express from 'express'
import {allproduct, removeProduct, updateproduct, addProduct, newCollection, popularWomen} from '../Controller/product.controller.js'



const router = express.Router()

router.get('/allproduct', allproduct)
  
router.post('/removeProduct', removeProduct)
  
router.put('/updateproduct', updateproduct)
  
router.post('/addProduct', addProduct)
  
router.get('/newCollection', newCollection)
  
router.get('/popularWomen', popularWomen)


export default router
  