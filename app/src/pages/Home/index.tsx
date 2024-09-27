import Container from "../../components/Container";
import Button from "../../components/Button";
import * as S from "./style";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <Container
            align="center"
            footer={
                <Footer>
                    <Button
                        text="Últimas medições"
                        color="var(--primary-color)"
                        background="white"
                        border="var(--primary-color)"
                        onClick={() => navigate('list')}
                    />
                </Footer>
            }
        >
            <S.Logo src="/logo.png" alt="Logo"/>
            
            <S.Title>Medidor de Consumo</S.Title>
            <div>
                <S.Text>Seja bem-vindo ao app de medição de consumo.
                    Aqui você poderá medir e consultar todo o seu consumo de água e gás.</S.Text>
                <S.Text>Selecione uma opção abaixo para começar:</S.Text>
            </div>
            <S.Container>
                <Button text="Medir água" onClick={() => navigate('upload', { state: { type: 'WATER'}})}></Button>
                <Button text="Medir gás" onClick={() => navigate('upload', { state: { type: 'GAS' } })}></Button>
            </S.Container>
        </Container>
    );
}

export default Home;