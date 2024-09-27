import Container from "../components/Container";
import Button from "../components/Button";
import styled from "styled-components";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const StyledTitle = styled.h3`
    color: #2a99d6;
    font-size: 20px;
    font-weight: 600;
    margin: 0;
`;

const StyledText = styled.p`
    font-size: 16px;
    text-align: center;
    margin: 20px 0;
`;

const Home = () => {
    const navigate = useNavigate();

    return (
        <Container
            align="center"
            footer={
                <Footer>
                    <Button
                        text="Últimas medições"
                        color="#2a99d6"
                        background="white"
                        border="#2a99d6"
                        onClick={() => navigate('list')}
                    />
                </Footer>
            }
        >
            <img src="/logo.png" alt="Logo" style={{ height: '100px' }}/>
            
            <StyledTitle>Medidor de Consumo</StyledTitle>
            <div>
                <StyledText>Seja bem-vindo ao app de medição de consumo.
                    Aqui você poderá medir e consultar todo o seu consumo de água e gás.</StyledText>
                <StyledText>Selecione uma opção abaixo para começar:</StyledText>
            </div>
            <div style={{ display: 'flex', gap: '15px', flexDirection: 'column', width: '100%', margin: '15px 0'}}>
                <Button text="Medir água" onClick={() => navigate('upload', { state: { type: 'WATER'}})}></Button>
                <Button text="Medir gás" onClick={() => navigate('upload', { state: { type: 'GAS' } })}></Button>
            </div>
        </Container>
    );
}

export default Home;