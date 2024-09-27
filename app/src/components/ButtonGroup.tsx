import styled from "styled-components";

interface ButtonGroupProps {
    options: {
        value: string;
        label: string;
    }[];
    selectedOption: string;
    onSelect: (option: string) => void;
}

const StyledButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    margin: 0 auto;
`;

const StyledButton = styled.button`
    background: #fff;
    border: 1px solid #ddd;
    padding: 7px 25px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    color: #616060;
    &:hover {
        background: #f5f5f5;
    }
    &.selected {
        background: var(--primary-color);
        color: #fff;
        border-color: var(--primary-color);
    }
    &:not(:first-child) {
        border-left: none;
    }
    &:first-child {
        border-radius: 10px 0 0 10px;
    }
    &:last-child {
        border-radius: 0 10px 10px 0;
    }
`;

const ButtonGroup = (props: ButtonGroupProps) => {
    return (
        <StyledButtonGroup className="button-group">
            {props.options.map(option => (
                <StyledButton
                    key={option.value}
                    className={props.selectedOption === option.value ? 'selected' : ''}
                    onClick={() => props.onSelect(option.value)}
                >
                    {option.label}
                </StyledButton>
            ))}
        </StyledButtonGroup>
    );
};

export default ButtonGroup;