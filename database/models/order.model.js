import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    orderItems: [{
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
    totalOrderPrice: Number,
    shippingAddress: {
        street: String,
        city: String,
        country: String,
        phone: String,
    },
    paymentType: {
        type: String,
        enum: ["cash", "card"],
        default: "cash"
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: Date,
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: Date
}, {timestamps: true});

const orderModel = mongoose.model('Order', orderSchema);
export default orderModel