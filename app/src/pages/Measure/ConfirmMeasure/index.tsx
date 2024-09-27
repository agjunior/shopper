import { useState } from "react";
import { useMeasure } from "../../../hooks/useMeasure";
import { useLocation } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Container from "../../../components/Container";
import Button from "../../../components/Button";
import Confirmation from "../../../components/Confirmation";
import { z } from 'zod';
import * as S from "./style";

const ListMeasure = () => {

  const { confirmMeasure } = useMeasure();
  const { state } = useLocation();

  const [inputValue, setInputValue] = useState(state?.confirmed_value || '');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConfirm = async () => {
    const success = await confirmMeasure({
      measure_uuid: state.measure_uuid,
      confirmed_value: parseInt(inputValue),
    });

    if (success) {
      setIsSuccess(true);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const result = z.string().regex(/^\d*$/).safeParse(value);

    if (result.success && value.length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  const header = <Header title="Confirmar medição" />;
  const footer = (
    <Footer>
      <Button text="Confirmar" disabled={isButtonDisabled} onClick={handleConfirm} />
    </Footer>
  );

  if (isSuccess) {
    return (
      <Confirmation title="Tudo certo!" message="Consumo confirmado com sucesso!" />
    );
  }

  return (
    <Container
      align="center"
      header={header}
      footer={footer}
    >
      <S.Content>
        <S.Image src={state.image_url} alt="Foto medidor" />
        <p>Tentamos identificar a medição atual. Corrija o valor se necessário.</p>
        <S.Input
          type="number"
          placeholder="Digite o valor"
          value={inputValue}
          onChange={handleInputChange}
        />
      </S.Content>
    </Container>
  );
}

export default ListMeasure;