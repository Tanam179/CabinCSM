import { HiChevronDoubleRight, HiOutlineHome } from 'react-icons/hi2';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
    background: #f1f4f7;
    padding: 8px 20px;
    border-radius: 8px;
    display: inline-block;
    margin-bottom: 20px;
`;

const NavList = styled.ul`
    display: flex;
    gap: 10px;
    font-size: 14px;
    text-transform: capitalize;
    align-items: center;
`;

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: 10px;
    line-height: 1.5;
`;

const BreadCrumbs = () => {
    const currentLocation = useLocation();
    return (
        <Nav>
            <NavList>
                <li>
                    <StyledLink to="/">
                        <HiOutlineHome size={20} /> 
                        <span>Home</span>
                    </StyledLink>
                </li>
                <HiChevronDoubleRight size={12} />
                <li>
                    <span style={{ color: 'var(--color-brand-500)', fontWeight: 600 }}>
                        {currentLocation.pathname.slice(1)}
                    </span>
                </li>
            </NavList>
        </Nav>
    );
};

export default BreadCrumbs;
