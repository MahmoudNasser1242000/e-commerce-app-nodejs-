import mongoose from 'mongoose';
const { Schema } = mongoose;

const cartSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    cartItems: [{
        product: {
            type: Schema.Types.ObjectId, 
            ref: "Product",
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: Number,
    }],
    totalPrice: Number,
    couponCode: String,
    discount: {
        type: Number,
        default: 0
    },
    totalPriceAfterDiscount: {
        type: Number,
        default: 0
    },
}, {timestamps: true});

const cartModel = mongoose.model('Cart', cartSchema);
export default cartModel