import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URI);
        const instance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`MongoDB Connected Successfully to the host : ${instance.connection.host}`);        
    } catch (error) {
        console.error(`MongoDB Connection failed :: ${error}`);
        process.exit(1);
    }
};

export default connectDB;