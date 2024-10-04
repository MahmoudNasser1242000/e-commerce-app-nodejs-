import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const dbconnection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_CONNECTION_URL); //DATABASE_ONLINE_CONNECTION_URL
        console.log("database connected successfully");
    } catch (error) {
        console.log("database error:", error);
    }
}

export default dbconnection;