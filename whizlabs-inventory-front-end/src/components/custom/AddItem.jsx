import { Button, Center, Fieldset, Heading, Input, Stack, Textarea, Toast } from "@chakra-ui/react";
import { Field } from '../ui/field'
import { toaster } from "../ui/toaster"
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND } from "../../constants";

const AddItem = ({ id }) => {
    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(1);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (id) {
            const fetch = async () => {
                const data = await axios.get(`${BACKEND}/items/${id}`);
                if (data.data.success) {
                    setItemName(data.data.data.itemName);
                    setDescription(data.data.data.description);
                    setCategory(data.data.data.category);
                    setPrice(data.data.data.price);
                    setQuantity(data.data.data.quantity);
                }
            }
            fetch();
        }
    }, []);

    const validate = () => {
        const newErrors = {};
        if (!itemName || itemName.trim() === "") {
            newErrors.itemName = "ItemName is required";
        }
        if (!description || description.trim() === "") {
            newErrors.description = "Description is required";
        }
        if (!category || category.trim() === "") {
            newErrors.category = "Category is required";
        }
        if (price === undefined || price < 1) {
            newErrors.price = "Price is required and should be positive";
        }
        if (quantity === undefined || quantity < 0) {
            newErrors.quantity = "Quantity is required and should be positive";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length > 0;
    }

    const handleNameChange = (e) => {
        setItemName(e.target.value);
    }
    const handleDescChange = (e) => {
        setDescription(e.target.value);
    }
    const handleCateChange = (e) => {
        setCategory(e.target.value);
    }
    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    }
    const handleQuanChange = (e) => {
        setQuantity(e.target.value);
    }

    const addItem = () => {
        const add = async () => {
            try {

                const result = id ? await axios.put(`${BACKEND}/items/${id}`, {
                    itemName: itemName.trim(),
                    description: description.trim(),
                    category: category.trim(), price, quantity
                }) : await axios.post(`${BACKEND}/items`, {
                    itemName: itemName.trim(),
                    description: description.trim(),
                    category: category.trim(), price, quantity
                });
                console.log(result);
                if (result.data.success) {
                    setItemName("");
                    setDescription("");
                    setCategory("");
                    setPrice(1);
                    setQuantity(0);
                    toaster.create({
                        description: result.data.message,
                        type: "info",
                    });
                }
            }
            catch (err) {
                console.log(err.response.data.data);
                toaster.create({
                    description: err.response.data.data,
                    type: "danger",
                });
                return;
            }
        }
        if (!validate()) {
            add();
        }
    }

    return (
        <>
            <Center><Fieldset.Root size={"lg"} maxW={"6xl"}>
                <Stack>
                    <Center>
                        <Fieldset.Legend>
                            <Heading size="4xl">{id ? "Edit Item" : "Add Item"}</Heading>
                        </Fieldset.Legend>
                    </Center>
                </Stack>
                <Fieldset.Content>
                    <Field label="ItemName" invalid={errors.itemName && true} errorText={errors.itemName}>
                        <Input name="ItemName" onChange={handleNameChange} value={itemName} />
                    </Field>
                    <Field label="Description" invalid={errors.description && true} errorText={errors.description}>
                        <Textarea name="Description" onChange={handleDescChange} value={description} />
                    </Field>
                    <Field label="Category" invalid={errors.category && true} errorText={errors.category}>
                        <Input name="Category" onChange={handleCateChange} value={category} />
                    </Field>
                    <Field label="Price" invalid={errors.price && true} errorText={errors.price}>
                        <Input name="Price" type="number" onChange={handlePriceChange} value={price} />
                    </Field>
                    <Field label="Quantity" invalid={errors.quantity && true} errorText={errors.quantity}>
                        <Input name="ItemName" type="number" onChange={handleQuanChange} value={quantity} />
                    </Field>
                </Fieldset.Content>
                <Button type="submit" alignSelf="flex-start" onClick={addItem}>
                    Add Item
                </Button>
            </Fieldset.Root></Center>
        </>
    );
}

export default AddItem;