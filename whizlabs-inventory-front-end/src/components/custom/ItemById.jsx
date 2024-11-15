import { Button, Center, Container, Group, Heading, List, Text } from '@chakra-ui/react';
import { Blockquote } from "../ui/blockquote"
import { deleteItem } from '../../utils/items/deleteItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND } from '../../constants';
import { useNavigate, useParams } from 'react-router-dom';
import GeneralError from './GeneralError';

const ItemById = () => {
    const { id } = useParams();
    const [item, setItem] = useState({
        itemName: "", description: "", category: "", price: 1, quantity: 0, createdAt: "", updatedAt: ""
    });
    const [errorText, setErrorText] = useState("");
    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await axios.get(`${BACKEND}/items/${id}`);
                if (result.data.success) {
                    setItem(result.data.data)
                }
            } catch (error) {
                setErrorText(error.response.data.data || error.response.data.message);
            }
        }
        fetch();
    }, []);

    const navi = useNavigate();
    const goEdit = (id) => {
        navi(`/edit/${id}`);
    }
    const goHome = () => {
        navi(`/`);
    }

    const handleDelete = async id => {
        const deletedMessage = await deleteItem(id);
        console.log(deletedMessage);
    }
    return (
        (errorText !== "") ? <GeneralError errorText={errorText} /> :
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
                        <Button onClick={() => goHome()}>Home</Button>
                        <Button onClick={() => goEdit(item._id)}>Edit</Button>
                        <Button onClick={async () => { await handleDelete(item._id) }} variant="ghost">Delete</Button>
                    </Group>
                </Container>
            </Center >
    )
}

export default ItemById