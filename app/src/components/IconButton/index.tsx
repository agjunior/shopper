import styled from "styled-components";
import { IconType } from 'react-icons';

const Button = styled.button`
    background: white;
    border: 2px solid #ddd;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    color: var(--primary-color);
`;

type IconButtonProps = {
    icon: IconType;
    onClick: () => void;
    size?: number;
    color?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  onClick,
  size = 16,
  color
}) => {
    return (
      <Button onClick={onClick}>
        <Icon size={size} color={color} />
      </Button>
    );
  };

export default IconButton;