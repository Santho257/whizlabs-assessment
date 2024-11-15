import dotenv from "dotenv";
import connectDB from "./db/connection.mjs";
import { app } from "./app.js";

dotenv.config({ path: "../.env.dev" });

connectDB()
    .then(app.listen(process.env.PORT || 3000, () => {
        console.log("Server Listening to the PORT :: " + (process.env.PORT || 3000));
        console.log(`http://localhost:${process.env.PORT || 3000}/`)
    }))
    .catch((err) => {
        console.log("Error Connecting to Database :: " + err);
    });