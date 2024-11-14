import dotenv from "dotenv";
import connectDB from "./db/connection.mjs";
import { app } from "./app";

dotenv.config({ path: "./env" });
connectDB()
    .then(app.listen(process.env.PORT || 3000, () => {
        console.log("Server Listening to the PORT :: " + process.env.PORT);
    }))
    .catch((err) => {
        console.log("Error Connecting to Database :: " + err);
    });