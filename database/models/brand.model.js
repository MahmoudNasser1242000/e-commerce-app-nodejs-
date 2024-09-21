import mongoose from 'mongoose';
const { Schema } = mongoose;

const brandSchema = new Schema({
    name: {
        type: String,
        minLength: [3, "Brand name must be minimum of 3 characters"],
        trim: true,
        required: true, 
        unique: [true, "Brand name must be unique"]
    },
    slug: {
        type: String,
        trim: true,
        lowercase: true,
        required: true, 
    },
    logo: String,
}, {timestamps: true});

brandSchema.pre("save", function (next) {
    this.logo = "http://localhost:3000/uploads/" + this.logo
    next()
})

const brandModel = mongoose.model('Brand', brandSchema);
export default brandModel