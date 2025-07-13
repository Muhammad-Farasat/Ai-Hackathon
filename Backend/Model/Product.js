import mongoose from 'mongoose';


const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  images: {
      type: [String],
      required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  sizes: {
      type: [String],
      required: true
    },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

export default Product