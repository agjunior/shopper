import Container from "../components/Container";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FaExclamation } from 'react-icons/fa';

const StyledContent = styled.div`
    text-align: center;
    padding: '0 20px';
`;

const ErrorIcon = styled(FaExclamation)`
    color: white;
    background-color: #eb3737;
    border-radius: 50%;
    padding: 10px;
    font-size: 50px;
`;

const Error = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

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
                <ErrorIcon />
                <h2>{state.title || 'Ocorreu um erro'}</h2>
                <p>{state.message || 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.'}</p>
            </StyledContent>
        </Container>
    )
};

export default Error;