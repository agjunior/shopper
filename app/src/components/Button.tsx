import styled from "styled-components";

const StyledButton = styled.button`
    background: var(--primary-color);
    border: 1px solid var(--primary-color);
    border-radius: 15px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    padding: 15px 15px;
    width: 100%;
    font-weight: 600;
    box-shadow: 0px 3px 12px #00000040;
    font-family: 'Nunito', sans-serif;
`;

type ButtonProps = {
    text: string;
    color?: string;
    background?: string;
    border?: string;
    disabled?: boolean;
    onClick: () => void;
}

const Button = (props: ButtonProps) => (
    <StyledButton
    onClick={props.onClick}
    style={{
        background: props.background,
        borderColor: props.border,
        color: props.color,
    }}
    disabled={props.disabled}>
        {props.text}
    </StyledButton>
);

export default Button;