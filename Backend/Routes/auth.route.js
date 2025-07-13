import express from 'express'
import {login, signup, adminLogin, userDetail} from '../Controller/auth.controller.js'
import FetchUser from '../Middleware/FetchUser.js'

const router = express.Router()

router.post('/signup', signup)
  
router.post('/login', login)

router.post('/adminLogin', adminLogin)

router.get('/user-details', FetchUser, userDetail)

export default router