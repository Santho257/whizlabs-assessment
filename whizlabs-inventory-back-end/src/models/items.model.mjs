import mongoose,{Schema} from "mongoose";

const itemsSchema = new Schema({
    itemName: {
        type: "String",
        required: true,
        unique: true,
        index: true
    },
    quantity: {
        type: "Number",
        min: [0, "Quantity cannot be negative"],
        default: 0,
        required: true
    },
    price: {
        type: "Number",
        min: [1, "Price must be atleast $1"],
        required: true
    },
    description: {
        type: "String",
        required: "true"
    },
    category: {
        type: "String",
        required: true
    }
}, {timestamps: true});

export const Item = mongoose.model("Items", itemsSchema);