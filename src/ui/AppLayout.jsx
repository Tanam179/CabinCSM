import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import BreadCrumbs from "./BreadCrumbs";
import styled from "styled-components";

const StyledAppLayout = styled.div`
    display: grid;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
`

const Main = styled.main`
    padding: 4rem 4.8rem 6.4rem;
    overflow: auto;
    background-color: var(--color-grey-50);

`

const Container = styled.div`
    margin: 0 auto;
    max-width: 1200px;
`

const AppLayout = () => {
    return (
        <StyledAppLayout>
            <Header/>
            <Sidebar/>
            <Main>
                <Container>
                    <BreadCrumbs/>
                    <Outlet/>
                </Container>
            </Main>
        </StyledAppLayout>
    );
};

export default AppLayout;