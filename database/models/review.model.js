import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema({
    comment: {
        type: String,
        trim: true,
        minLength: [3, "Review comment must be minimum of 3 characters"],
    },
    rate: {
        type: Number,
        min: 0,
        max: 5,
        required: true, 
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    },
    product: {
        type: Schema.Types.ObjectId, 
        ref: "Product", 
        required: true
    },
});

const reviewModel = mongoose.model('Review', reviewSchema);
export default reviewModel