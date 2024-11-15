import { Router } from "express";
import { addItem, deleteItem, getItemById, getItems, updateItem } from "../controllers/items.controller.mjs";

const itemsRouter = Router();

itemsRouter.route("").get(getItems);
itemsRouter.route("").post(addItem);
itemsRouter.route("/:id").get(getItemById);
itemsRouter.route("/:id").put(updateItem);
itemsRouter.route("/:id").delete(deleteItem);

export default itemsRouter;