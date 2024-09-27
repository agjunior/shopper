import { NavLink as BaseNavLink } from "react-router-dom";
import styled from "styled-components";

type MenuButtonProps = {
    text: string;
    link: string;
    icon?: string;
    state?: string
}

const Container = styled.div`
    padding: 10px;
    width: 100%;
`;

const NavLink = styled(BaseNavLink)`
    border: 1px solid #2a99d6;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    padding: 15px;
    font-size: 16px;
    font-weight: 600;
    color: #2a99d6;
`;

const MenuButton = (props: MenuButtonProps) => (
    <Container>
        <NavLink to={props.link}>
            {props.text}
        </NavLink>
    </Container>
);

export default MenuButton;