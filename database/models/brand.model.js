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
});

brandSchema.post("insertMany", (doc) => {
    doc[0].logo = "http://localhost:3000/uploads/" + doc[0].logo
})

const brandModel = mongoose.model('Brand', brandSchema);
export default brandModel