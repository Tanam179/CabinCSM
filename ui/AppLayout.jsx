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
`

const Container = styled.div`
    max-width: 120rem;
    margin: 0 auto;
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