import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLogo = styled.div`
    text-align: center;
`;

const Img = styled.img`
    height: 5rem;
    width: auto;
`;

function Logo() {
    return (
        <StyledLogo>
            <Link to="/">
                <Img src="/Cabinscape_HeaderLogo.png" alt="Logo" />
            </Link>
        </StyledLogo>
    );
}

export default Logo;
