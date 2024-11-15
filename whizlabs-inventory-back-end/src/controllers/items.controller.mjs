import { Item } from "../models/items.model.mjs";
import { asyncHandler } from "../utils/asyncHandler.util.mjs";
import { ApiResponse } from "../utils/ApiResponse.mjs";
import { ApiError } from "../utils/ApiError.mjs";

const validateItem = ({ itemName, quantity, price, description, category }) => {
    if ([itemName, description, category].some(col => !col || col.trim() === "")) throw new ApiError("All fields are required", 400);  //Checks whether any field is empty

    if (quantity === undefined || quantity < 0) throw new ApiError("Quantity cannot be negative", 400);
    if (!price || price < 1) throw new ApiError("Price should be atleast $1", 400); //Checks Whether quantity or price is below its provided value
}

export const getItems = asyncHandler(async (req, res) => {
    const allItems = await Item.find().select("-description -category");
    res.status(200).json(new ApiResponse(
        200, allItems, "All Items"));
});

export const addItem = asyncHandler(async (req, res) => {
    const { itemName, quantity, price, description, category } = req.body;

    try {
        validateItem({ ...req.body });
    } catch (error) {
        throw error;
    }

    const alreadyExists = await Item.findOne({ itemName: itemName.trim().toUpperCase() });
    if (alreadyExists) throw new ApiError("Item Already Exists", 400);//checks whether item already exists

    const addedItem = await Item.create({
        itemName: itemName.trim().toUpperCase(),
        category: category.toUpperCase(),
        description,
        price,
        quantity
    });//saves the item to DB

    res.status(201).json(new ApiResponse(201, addedItem._id, "Item Added Successfully"));
});

export const deleteItem = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) {
        throw new ApiError("Item Doesnot exists with ID :: " + id, 404);
    }
    const deletedItem = await Item.findByIdAndDelete(id);
    res.status(202).json(new ApiResponse(202, deletedItem.itemName, `Item ${deletedItem.itemName} Deleted Sucessfullty`));
});

export const updateItem = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) throw new ApiError("Item Doesnot exists with ID :: " + id, 404);
    const { itemName, quantity, price, description, category } = req.body;
    try {
        validateItem(req.body);
    } catch (error) {
        throw error;
    }
    if (item.itemName != itemName.trim().toUpperCase()) {
        const alreadyExists = await Item.findOne({ itemName: itemName.trim().toUpperCase() });
        if (alreadyExists) throw new ApiError("Item Already Exists", 400);
    }
    const updatedItem = await Item.findByIdAndUpdate(id, {
        itemName: itemName.trim().toUpperCase(),
        category: category.toUpperCase(),
        description,
        price,
        quantity
    });
    res.status(200).json(new ApiResponse(200, updatedItem.itemName, `Item ${updatedItem.itemName} updated Sucessfullty`));
});

export const getItemById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) throw new ApiError("Item Doesnot exists with ID :: " + id, 404);
    res.status(200).json(new ApiResponse(200, item, `Item with id :: ${id}`));
});