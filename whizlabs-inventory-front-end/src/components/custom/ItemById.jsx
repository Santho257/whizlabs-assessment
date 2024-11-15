import { Button, Center, Container, Group, Heading, List, Text } from '@chakra-ui/react';
import { Blockquote } from "../ui/blockquote"
import { deleteItem } from '../../utils/items/deleteItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND } from '../../constants';

const ItemById = ({ id }) => {
    const [item, setItem] = useState({
        itemName: "", description: "", category: "", price: 1, quantity: 0, createdAt: "", updatedAt: ""
    });
    const [errorText, setErrorText] = useState("");
    useEffect(() => {
        const fetch = async () => {
            try {
                console.log(id);
                const result = await axios.get(`${BACKEND}/items/${id}`);
                if (result.data.success) {
                    setItem(result.data.data)
                }
            } catch (error) {
                setErrorText(error.response.data.data);
            }
        }
        fetch();
    }, []);

    const editPage = () => {

    }

    const handleDelete = async id => {
        const deletedMessage = await deleteItem(id);
        console.log(deletedMessage);
    }
    return (
        (errorText !== "") ? errorText :
            <Center>
                <Container maxW={"lg"}>
                    <Heading size="6xl" marginBlockEnd={"3rem"}>{item.itemName}</Heading>
                    <Blockquote showDash marginBlockEnd={"3rem"}>{item.description}</Blockquote>
                    <List.Root marginBlockEnd={"3rem"}>
                        <List.Item>Category: {item.category}</List.Item>
                        <List.Item>Price: ${item.price}</List.Item>
                        <List.Item>Quantity: {item.quantity}</List.Item>
                    </List.Root>
                    <Group marginBlockEnd={"3rem"}>
                        <Button onClick={editPage}>Edit</Button>
                        <Button onClick={async () => { await handleDelete(item._id) }} variant="ghost">Delete</Button>
                    </Group>
                </Container>
            </Center >
    )
}

export default ItemById