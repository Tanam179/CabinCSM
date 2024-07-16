import { Fragment } from 'react';
import DashboardLayout from '../features/dashboard/DashboardLayout';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import DashboardFilter from '../features/dashboard/DashboardFilter';

function Dashboard() {
    return (
        <Fragment>
            <Row type="horizontal" style={{ marginBottom: 20 }}>
                <Heading as="h1">Dashboard</Heading>
                <DashboardFilter/>
            </Row>
            <DashboardLayout />
        </Fragment>
    );
}

export default Dashboard;
