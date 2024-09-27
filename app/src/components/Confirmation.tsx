import Container from "./Container";
import Footer from "./Footer";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaCheck } from 'react-icons/fa';

const StyledContent = styled.div`
    text-align: center;
    padding: '0 20px';
`;

const SuccessIcon = styled(FaCheck)`
    color: white;
    background-color: #31ab5d;
    border-radius: 50%;
    padding: 10px;
    font-size: 50px;
`;

type ConfirmationProps = {
    title: string;
    message: string;
};

const Confirmation = (props: ConfirmationProps) => {
    const navigate = useNavigate();

    return (
        <Container
            align="center"
            footer={
                <Footer>
                    <Button text="Voltar" onClick={() => navigate('/')} />
                </Footer>
            }
        >
            <StyledContent>
                <SuccessIcon />
                <h2>{props.title}</h2>
                <p>{props.message}</p>
            </StyledContent>
        </Container>
    )
};

export default Confirmation;