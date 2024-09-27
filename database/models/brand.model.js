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
    createdBy: {
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
}, {timestamps: true});

brandSchema.post("init", function (doc) {
    doc.logo = "http://localhost:3000/uploads/" + doc.logo
})

const brandModel = mongoose.model('Brand', brandSchema);
export default brandModel