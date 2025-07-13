import express from 'express'
import cors from 'cors'
import multer from 'multer'
import connectToDb from './db/connectToDb.js'
import dotenv from 'dotenv'
import authRoutes from './Routes/auth.route.js'
import productRoutes from './Routes/product.route.js'
import cartRoutes from './Routes/cart.route.js'
import orderRoutes from './Routes/order.route.js'
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import voiceRouter from "./Routes/voice.route.js"
dotenv.config()
connectToDb()


const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use(cors());


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'upload',
    public_id: (req, file) => `${file.fieldname}_${Date.now()}`,
  },
});

// Multer Middleware
const upload = multer({ storage });

app.post("/upload", upload.array('images', 5), (req, res) => {

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ 
      success: 0,  
      message: "No files were uploaded" 
    });
  }

  const uploadedFiles = req.files.map(file => ({
    url: file.path,
    public_id: file.filename
  }))

  console.log(req.files);
  

  res.json({
    success: 1,
    image_url: uploadedFiles,
  });

});




app.use(authRoutes)
app.use(productRoutes)
app.use(cartRoutes)
app.use(orderRoutes)
app.use("/api/voice", voiceRouter);



app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Test route to check environment variables
app.get('/test-env', (req, res) => {
  res.json({
    geminiKey: process.env.GEMINI_API_KEY ? 'Present' : 'Missing',
    geminiKeyLength: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0,
    allEnvVars: Object.keys(process.env).filter(key => key.includes('GEMINI'))
  });
});

app.listen(port, (error) => {
  if (!error) {
    console.log(`Example app listening on port ${port}`);
  } else {
    console.log('This is error!', error);
  }
});