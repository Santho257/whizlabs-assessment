import dotenv from "dotenv";
import connectDB from "./db/connection.mjs";

dotenv.config({path: "./env"});
connectDB();