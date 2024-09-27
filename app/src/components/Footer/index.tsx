import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
    // position: fixed;
    // bottom: 0;
    // left: 0;
    // width: 100%;
    // background: #fff;
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 20px;
`;

type FooterProps = {
    children: React.ReactNode;
};

const Footer: React.FC<FooterProps> = ({ children }) => {
    return <StyledFooter>{children}</StyledFooter>;
};

export default Footer;