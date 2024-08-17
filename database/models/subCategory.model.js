import mongoose from 'mongoose';
const { Schema } = mongoose;

const subCategorySchema = new Schema({
    name: {
        type: String,
        minLength: [3, "SubCategory name must be minimum of 3 characters"],
        trim: true,
        required: true, 
        unique: [true, "SubCategory name must be unique"]
    },
    slug: {
        type: String,
        trim: true,
        lowercase: true,
        required: true, 
    },
    categoryId: {
        type: Schema.Types.ObjectId, 
        ref: "Category", 
        required: true
    },
});

const subCategoryModel = mongoose.model('SubCategory', subCategorySchema);
export default subCategoryModel