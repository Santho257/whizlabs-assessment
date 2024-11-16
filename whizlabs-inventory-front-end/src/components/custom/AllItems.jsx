import { Button, Card, Center, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from 'axios';
import { BACKEND } from "../../constants";
import { deleteItem } from "../../utils/items/deleteItem";
import { useNavigate } from "react-router-dom";
import { toaster } from "../ui/toaster";
// import { useNavigate } from "react-router-dom";

const AllItems = () => {
    // const navi = useNavigate();
    const [count, setCount] = useState(0);
    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const data = await axios(`${BACKEND}/items`);
            if (data.data.success)
                setItems(data.data.data);
        }
        fetch();
    }, [count]);

    const navi = useNavigate();
    const handleCardClick = (id) => {
        navi(`/${id}`);
    }
    const goEdit = (id) => {
        navi(`/edit/${id}`);
    }
    const handleDelete = async id => {
        try {
            const deletedMessage = await deleteItem(id);
            toaster.create({
                description: deletedMessage,
                type: "success"
            })
            setCount(count + 1);
        } catch (error) {
            toaster.create({
                description: error.response.data.data || error.response.data.message,
                type: "error"
            })
        }
    }

    return (
        <>
            <Flex justify={"space-between"} align={"center"}>
                <Heading size={{ sm: "7xl", smDown: "5xl" }}>All Items</Heading>
                <Button size={"2xl"} onClick={() => navi("/add")}>Add Item</Button>
            </Flex>
            <SimpleGrid marginBlockStart={"2rem"} columns={{ lg: 4, mdToLg: 3, smToMd: 2 }} gap="40px">
                {items.map(item => <Card.Root key={item._id} overflow="hidden">
                    <Card.Body gap="2">
                        <Card.Title onClick={() => { handleCardClick(item._id) }} cursor={"pointer"}>{item.itemName}</Card.Title>
                        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                            ${item.price}
                        </Text>
                        <Text textStyle="l" fontWeight="medium" letterSpacing="tight" mt="2">
                            Quantity: {item.quantity}
                        </Text>
                    </Card.Body>
                    <Card.Footer gap="2">
                        <Button onClick={() => goEdit(item._id)} variant="solid">Edit</Button>
                        <Button onClick={async () => { await handleDelete(item._id) }} variant="ghost">Delete</Button>
                    </Card.Footer>
                </Card.Root>
                )}
            </SimpleGrid>
        </>
    )
}

export default AllItems