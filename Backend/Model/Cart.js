import mongoose from 'mongoose'


const Cart = new mongoose.model('cart', {

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
            name: { type: String, required: true },
            price: { type: Number, required: true },
            images: {type: String, required: true},
            sizes: {type: String, required: true},
            quantity: { type: Number, required: true, min: 1 }
        }
    ],
    
    totalPrice: {
        type: Number,
        default: 0
    }

})

export default Cart