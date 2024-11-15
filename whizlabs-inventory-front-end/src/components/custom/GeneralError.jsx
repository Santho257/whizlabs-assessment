import { Button } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const GeneralError = ({ errorText }) => {
    const navi = useNavigate();
    const goHome = () => {
        navi(`/`);
    }
    return (
        <div>{errorText} <Button onClick={goHome}>GO HOME</Button></div>

    )
}

export default GeneralError