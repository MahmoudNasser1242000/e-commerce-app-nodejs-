import mongoose from 'mongoose';
const { Schema } = mongoose;

const couponSchema = new Schema({
    code: {
        type: String,
        minLength: [3, "Coupon code must be at least 5 characters"],
        trim: true,
        required: true,
        unique: [true, "Code must be unique"]
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
    createdBy: {
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
});

const couponModel = mongoose.model('Coupon', couponSchema);
export default couponModel