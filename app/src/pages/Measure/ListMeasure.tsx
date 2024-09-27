import React, { useCallback, useEffect, useState } from "react";
import { useCustomer } from "../../contexts/CustomerContext";
import { useLoading } from "../../contexts/LoadingContext";
import { useMeasure } from "../../hooks/useMeasure";
import ButtonGroup from "../../components/ButtonGroup";
import Header from "../../components/Header";
import Container from "../../components/Container";
import styled from "styled-components";
import { FaFire, FaCircleNotch } from 'react-icons/fa';
import { FaDroplet } from "react-icons/fa6";

const StyledItem = styled.div`
  background-color: #f8f9fa;
  border-radius: 15px;
  padding: 20px 20px;
  width: 100%;
  display: flex;
  gap: 15px;
`;

const StyledColumn = styled.div``;

const StyledSection = styled.h4`
  margin: 15px 10px 5px;
  font-weight: 600;
  font-size: 14px;
  color: #6c757d;
`;

const StyledTitle = styled.h3`
  margin: 0;
  font-size: 16px;
`;

const StyledIcon = styled.div`
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const StyledValue = styled.p`
  margin: 0;
  font-size: 14px
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 100%;
`;

const LoadingIcon = styled(FaCircleNotch)`
  font-size: 50px;
  margin-bottom: 20px;
  animation: spin 2s linear infinite;
  color: var(--primary-color);

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ListMeasure = () => {
  const { isLoading } = useLoading();
  const [ measures, setMeasures ] = useState([]);
  const { getMeasuresByCustomer } = useMeasure();
  const { code: customerCode } = useCustomer();
  const [selectedType, setSelectedType] = useState('');

  const fetchMeasures = useCallback(async () => {
    const typeFilter = selectedType === 'all' ? undefined : selectedType;
    const response = await getMeasuresByCustomer(customerCode, typeFilter);
    setMeasures(response.measures);
  }, [selectedType]);

  useEffect(() => {
    fetchMeasures();
  }, [selectedType]);

  const handleSelectType = (type: string) => {
    setSelectedType(type);
  };

  const groupMeasuresByMonth = (measures: any[]) => {
    if (!measures) {
      return {};
    }
    
    return measures.reduce((acc: any, measure: any) => {
      const date = new Date(measure.measure_datetime);
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      const monthYear = `${month} ${year}`;
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(measure);
      return acc;
    }, {});
  };

  const groupedMeasures = groupMeasuresByMonth(measures);

  type MeasureType = 'GAS' | 'WATER';

  const measureTypeItem: Record<MeasureType, {
    title: string;
    icon: React.ReactElement;
    backgroundColor: string,
    color: string
  }> = {
    GAS: {
      title: 'Gás',
      icon: <FaFire />,
      backgroundColor: '#edd2ca',
      color: '#af6452'
    },
    WATER: {
      title: 'Água',
      icon: <FaDroplet />,
      backgroundColor: '#cae2ed',
      color: '#528caf'
    }
  };

  const header = <Header title="Medições" />;

  return (
    <Container header={header}>
      <ButtonGroup
        options={[
          { label: 'Todos', value: 'all' },
          { label: 'Água', value: 'water' },
          { label: 'Gás', value: 'gas' },
        ]}
        selectedOption={selectedType || 'all'}
        onSelect={handleSelectType}
      />
      {isLoading ? (
      <StyledInfo>
          <LoadingIcon />
      </StyledInfo>
      ) : (
      <>
        <div style={{ width: '100%', height: '100%' }}>
        {Object.keys(groupedMeasures).length > 0 ? (
          Object.keys(groupedMeasures).map(monthYear => (
          <div key={monthYear}>
            <StyledSection>{monthYear}</StyledSection>
            {groupedMeasures[monthYear].map((measure: any) => {
              const itemType = measureTypeItem[measure.measure_type as MeasureType];
              return (
                <StyledItem key={measure.measure_uuid} style={{ background: itemType.backgroundColor }}>
                  <StyledColumn>
                    <StyledIcon style={{ color: itemType.color }}>{itemType.icon}</StyledIcon>
                  </StyledColumn>
                  <StyledColumn>
                    <StyledTitle>{itemType.title || measure.measure_type}</StyledTitle>
                    <StyledValue><b>{measure.value || 123456}</b> em {new Date(measure.measure_datetime).toLocaleDateString('pt-BR')}</StyledValue>
                  </StyledColumn>
                </StyledItem>
              )
            })}
          </div>
          ))
        ) : (
        <StyledInfo>
          <p>Nenhuma leitura realizada.</p>
        </StyledInfo>
        )}
        </div>
      </>
      )}
    </Container>
  );
}

export default ListMeasure;