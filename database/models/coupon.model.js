import mongoose from 'mongoose';
const { Schema } = mongoose;

const couponSchema = new Schema({
    code: {
        type: String,
        trim: true,
        required: true,
    },
    expire: Date,
    discount: {
        type: Number,
        min: 1,
        required: true, 
    },
    type: {
        type: String,
        enum: ["percentage", "fixed"],
        default: "fixed", 
    },
    status: {
        type: String,
        enum: ["active", "inActive"],
        default: "inActive", 
    },
    productId: {
        type: Schema.Types.ObjectId, 
        ref: "Product", 
        required: true
    },
});

const couponModel = mongoose.model('Coupon', couponSchema);
export default couponModel