import { useLocation, useNavigate } from "react-router-dom";
import IconButton from '../IconButton';
import styled from "styled-components";
import { FaChevronLeft, FaHome } from "react-icons/fa";

const Container = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    width: 100%;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledTitle = styled.h3`
    margin: 0;
    width: 100%;
    text-align: center;
    font-size: 16px;
`;

type HeaderProps = {
    title?: string;
}

const Header = (props: HeaderProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === "/";

    return (
        <Container>
            {!isHome && (
                <IconButton icon={FaChevronLeft} onClick={() => navigate(-1)}/>
            )}
            <StyledTitle>{props.title ?? ''}</StyledTitle>
            {!isHome && (
                <IconButton icon={FaHome} onClick={() => navigate('/')}/>
            )}
        </Container>
    )
}

export default Header;