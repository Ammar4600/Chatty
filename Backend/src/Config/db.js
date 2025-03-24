import mongoose from 'mongoose'
import dotenv from "dotenv"
dotenv.config()
const mongoURI = process.env.MONGODB_URI

const connectDB  = async function () {
try {
    await mongoose.connect(mongoURI,);
    console.log('Connected to MongoDB');
    
} catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
}
    
}

export default connectDB