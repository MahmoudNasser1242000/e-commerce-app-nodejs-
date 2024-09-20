import mongoose from 'mongoose';
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
    isBlocked: {
        type: Boolean,
        default: false
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    // profile: String,
});

userSchema.post("insertMany", (doc) => {
    doc[0].profileImg = "http://localhost:3000/uploads/" + doc[0].profileImg
})

const userModel = mongoose.model('User', userSchema);
export default userModel