import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    title: {
        type: String,
        minLength: [3, "Product title must be minimum of 3 characters"],
        trim: true,
        required: true, 
        unique: [true, "Product name must be unique"]
    },
    slug: {
        type: String,
        trim: true,
        lowercase: true,
        required: true, 
    },
    description: {
        type: String,
        minLength: [50, "Products description must be minimum of 50 characters"],
        trim: true,
        required: true, 
    },
    imgCover: String,
    images: [String],
    price: {
        type: Number,
        min: 0,
        required: true
    },
    priceAfterDiscount: {
        type: Number,
        min: 0,
    },
    sold: {
        type: Number,
        min: 0,
        default: 0
    },
    stock: {
        type: Number,
        min: 0,
    },
    rateCount: Number,
    rateAvg: Number,
    rate: {
        type: Number,
        min: 0,
        max: 5,
    },
    category: {
        type: Schema.Types.ObjectId, 
        ref: "Category", 
        required: true
    },
    subCategory: {
        type: Schema.Types.ObjectId, 
        ref: "SubCategory", 
        required: true
    },
    brand: {
        type: Schema.Types.ObjectId, 
        ref: "Brand", 
        required: true
    },
});

productSchema.pre("save", function (next) {
    this.imgCover = "http://localhost:3000/uploads/" + this.imgCover
    next()
})

const productModel = mongoose.model('Product', productSchema);
export default productModel