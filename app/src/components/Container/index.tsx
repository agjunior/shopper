import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const StyledContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

type ContainerProps = {
    align?: "center" | "flex-start" | "flex-end";
    children: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({
    align = "flex-start",
    header,
    footer,
    children,
}) => {
    return (
        <StyledContainer>
            {header && <div>{header}</div>}
            <StyledContent style={{
                alignItems: align,
                justifyContent: align,
            }}>
                {children}
            </StyledContent>
            {footer && <div>{footer}</div>}
        </StyledContainer>
    );
};

export default Container;