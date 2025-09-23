import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    // If the database is already connected, don't connect again
    if (connected) {
        console.log('MongoDB is successfully connected');
        return
    }

    // Connect
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;
    } catch (error) {
        console.log("🚀 ~ connectDB ~ error:", error)
    }
}

export default connectDB;