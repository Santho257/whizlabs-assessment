import { asyncHandler } from "../utils/asyncHandler.util.mjs";

export const getItems = asyncHandler((req, res) => {
    res.status(200).json({
        data: "All Items"
    })
});
