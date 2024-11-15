import express from "express";
import itemsRouter from "./routes/items.route.mjs";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));

app.use("/api/v1/items", itemsRouter);

export { app };