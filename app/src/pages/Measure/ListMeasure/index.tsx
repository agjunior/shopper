import React, { useCallback, useEffect, useState } from "react";
import { useCustomer } from "../../../contexts/CustomerContext";
import { useLoading } from "../../../contexts/LoadingContext";
import { useMeasure } from "../../../hooks/useMeasure";
import ButtonGroup from "../../../components/ButtonGroup";
import Header from "../../../components/Header";
import Container from "../../../components/Container";
import { FaFire } from 'react-icons/fa';
import { FaDroplet } from "react-icons/fa6";
import * as S from "./style";

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
      <S.Info>
          <S.LoadingIcon />
      </S.Info>
      ) : (
      <>
        <div style={{ width: '100%', height: '100%' }}>
        {Object.keys(groupedMeasures).length > 0 ? (
          Object.keys(groupedMeasures).map(monthYear => (
          <div key={monthYear}>
            <S.Section>{monthYear}</S.Section>
            {groupedMeasures[monthYear].map((measure: any) => {
              const itemType = measureTypeItem[measure.measure_type as MeasureType];
              return (
                <S.Item key={measure.measure_uuid} style={{ background: itemType.backgroundColor }}>
                  <S.Column>
                    <S.Icon style={{ color: itemType.color }}>{itemType.icon}</S.Icon>
                  </S.Column>
                  <S.Column>
                    <S.Title>{itemType.title || measure.measure_type}</S.Title>
                    <S.Value><b>{measure.measure_value}</b> em {new Date(measure.measure_datetime).toLocaleDateString('pt-BR')}</S.Value>
                  </S.Column>
                </S.Item>
              )
            })}
          </div>
          ))
        ) : (
        <S.Info>
          <p>Nenhuma leitura realizada.</p>
        </S.Info>
        )}
        </div>
      </>
      )}
    </Container>
  );
}

export default ListMeasure;