import { Button, Card, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from 'axios';
import { BACKEND } from "../../constants";
import { deleteItem } from "../../utils/items/deleteItem";
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

    const handleCardClick = (id, itemName) => {
        // navi(`/${id}`);
    }
    const editPage = id => {
        //
    }
    const handleDelete = async id => {
        const deletedMessage = await deleteItem(id);
        console.log(deletedMessage);
        setCount(count + 1);
    }

    return (
        <>
            <SimpleGrid columns={{ lg: 4, mdToLg: 3, smToMd: 2 }} gap="40px">
                {items.map(item => <Card.Root key={item._id} onClick={() => { handleCardClick(item._id, item.itemName) }} overflow="hidden">
                    <Card.Body gap="2">
                        <Card.Title>{item.itemName}</Card.Title>
                        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                            ${item.price}
                        </Text>
                        <Text textStyle="l" fontWeight="medium" letterSpacing="tight" mt="2">
                            Quantity: {item.quantity}
                        </Text>
                    </Card.Body>
                    <Card.Footer gap="2">
                        <Button onClick={editPage} variant="solid">Edit</Button>
                        <Button onClick={async () => { await handleDelete(item._id) }} variant="ghost">Delete</Button>
                    </Card.Footer>
                </Card.Root>
                )}
            </SimpleGrid>
        </>
    )
}

export default AllItems