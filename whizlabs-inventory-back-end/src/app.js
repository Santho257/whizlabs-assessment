import express from "express";
import itemsRouter from "./routes/items.route.mjs";

const app = express();
app.use(express.json());

app.use("/api/v1/items", itemsRouter);

export { app };