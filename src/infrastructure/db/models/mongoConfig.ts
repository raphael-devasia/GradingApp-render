import mongoose from "mongoose"
import * as dotenv from "dotenv"
dotenv.config()


const MONGO_URI =
    process.env.MONGO_URI ||''

// MongoDB connection function
export const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("MongoDB connected successfully!")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
        process.exit(1) // Exit the process with failure
    }
}
