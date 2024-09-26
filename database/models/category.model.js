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
    createdBy: {
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
}, {timestamps: true});

categorySchema.pre("save", function (next) {
    this.img = "http://localhost:3000/uploads/" + this.img
    next()
})

categorySchema.pre("findOneAndUpdate", function (next) {
    if (this._update.img) {
        this._update.img = "http://localhost:3000/uploads/" + this._update.img;
    }
    next()
})

const categoryModel = mongoose.model('Category', categorySchema);
export default categoryModel