import { FaCircleNotch } from "react-icons/fa";
import styled from "styled-components";

export const Item = styled.div`
  background-color: #f8f9fa;
  border-radius: 15px;
  padding: 20px 20px;
  width: 100%;
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
`;

export const Column = styled.div``;

export const Section = styled.h4`
  margin: 15px 10px 5px;
  font-weight: 600;
  font-size: 14px;
  color: #6c757d;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 16px;
`;

export const Icon = styled.div`
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Value = styled.p`
  margin: 0;
  font-size: 14px
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 100%;
`;

export const LoadingIcon = styled(FaCircleNotch)`
  font-size: 50px;
  margin-bottom: 20px;
  animation: spin 2s linear infinite;
  color: var(--primary-color);

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;