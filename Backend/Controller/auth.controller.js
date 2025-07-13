import User from '../Model/User.js'
import AdminUser from '../Model/AdminUser.js'
import jwt from 'jsonwebtoken'

export const signup =  async (req, res) => {


    try {
  
      let check = await User.findOne({ email: req.body.email })
  
      // console.log("working");
      if (check) {
        return res.status(400).json({ success: false, errors: "Email Exits " })
      }
  
      let cart = {};
  
      for (let i = 0; i < 300; i++) {
        cart[i] = 0;
      }
      const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
      })
      await user.save();
  
      //JWT AUTH
  
      const data = {
        user: {
          id: user.id,
        }
      }
  
      const token = jwt.sign(data, process.env.DB_KEY);
      res.json({ success: true, token, user })
  
    } catch (error) {
      console.error(error)
    }
  
}

export const login = async (req, res) => {
  
    let user = await User.findOne({ email: req.body.email })
  
    if (user) {
  
      const passCompare = req.body.password === user.password
  
      if (passCompare) {
        const data = {
          user: {
            id: user.id,
          }
        }
  
        const token = jwt.sign(data, process.env.DB_KEY);
        res.json({ success: true, token })
      }
      else {
        res.json({ success: false, error: "Incorrect password!!" })
      }
  
  
    }
    else {
      res.json({ success: false, error: "User doesn't exit!!" })
    }
  
}

export const adminLogin = async(req, res) =>{
  try {
    const {email, password} = req.body

    const adminEmail = 'admin123@gmail.com'
    const adminPassword = '789456'

    if (email === adminEmail && password === adminPassword) {
      
      
      const data = {
        user: {
          email: adminEmail,
        }
      }
      const token = jwt.sign(data, process.env.DB_KEY)
    
      return res.status(200).json({ success: true, token });
    
    }
    else{
      res.status(401).json({success: false, message: 'Invalid Email..!'})
    }




  } catch (error) {
   
    res.status(500).json({success: false, message:'Internal server error '})
    
  }
}

export const userDetail = async (req, res) => {
  try {
      const id = req.user.id

      const user = await User.findById(id)

      if (!user) {
          return res.status(400).json({ message: "User not found" })
      }

      return res.status(200).json({ success: true, user })


  } catch (error) {
      console.error("Error in controller", error);
      res.status(500).json({ error: "Internal servre error" })
  }
}