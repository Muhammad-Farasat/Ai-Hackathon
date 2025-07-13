import mongoose from 'mongoose';

const User = mongoose.model("User", {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      enum: ['customer', 'seller'],
      // default: 'customer'
    }
})


export default User