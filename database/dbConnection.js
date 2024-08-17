import mongoose from "mongoose";

const dbconnection = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/e-commerce-application');
        console.log("database connected successfully");
    } catch (error) {
        console.log("database error", error);
    }
}

export default dbconnection;