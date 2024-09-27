import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        minLength: [3, "User name must be minimum of 3 characters"],
        trim: true,
        required: true, 
    },
    email: {
        type: String,
        unique: [true, "Email must be unique"],
        trim: true,
        required: true, 
    },
    password: {
        type: String,
        required: true, 
    },
    profileImg: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    changePasswordAt: Date,
    isBlocked: {
        type: Boolean,
        default: false
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    wishlist: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
    }],
    address: [{
        street: String,
        city: String,
        country: String,
        phone: String,
    }]
}, {timestamps: true});

userSchema.pre("save", function (next) {
    this.profileImg = "http://localhost:3000/uploads/" + this.profileImg;

    const hashPassword = bcrypt.hashSync(this.password, 8);
    this.password = hashPassword
    next()
})

userSchema.pre("findOneAndUpdate", function (next) {
    if (this._update.profileImg) {
        this._update.profileImg = "http://localhost:3000/uploads/" + this._update.profileImg;
    }

    if (this._update.password) {
        const hashPassword = bcrypt.hashSync(this._update.password, 8);
        this._update.password = hashPassword    
    }
    next()
})

const userModel = mongoose.model('User', userSchema);
export default userModel