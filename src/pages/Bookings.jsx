import { Fragment } from 'react';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import BookingTable from '../features/bookings/BookingTable';
import BookingTableOperations from '../features/bookings/BookingTableOperations';

function Bookings() {
    return (
        <Fragment>
            <Row type="horizontal" style={{ marginBottom: 20 }}>
                <Heading as="h1">All bookings</Heading>
                <BookingTableOperations/>
            </Row>
            <Row>
                <BookingTable></BookingTable>
            </Row>
        </Fragment>
    );
}

export default Bookings;
