import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        minLength: [3, "Category name must be minimum of 3 characters"],
        trim: true,
        required: true, 
        unique: [true, "Category name must be unique"]
    },
    slug: {
        type: String,
        trim: true,
        lowercase: true,
        required: true, 
    },
    img: String,
});

const categoryModel = mongoose.model('Category', categorySchema);
export default categoryModel