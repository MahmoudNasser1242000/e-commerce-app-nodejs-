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
    product: {
        type: Schema.Types.ObjectId, 
        ref: "Product", 
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
}, {timestamps: true});

reviewSchema.pre(/^find/, function (next) {
    this.populate("createdBy", "name");
    next()
})

const reviewModel = mongoose.model('Review', reviewSchema);
export default reviewModel