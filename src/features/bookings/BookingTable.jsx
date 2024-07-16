import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import useBookings from '../../hooks/useBookings';
import Empty from '../../ui/Empty';
import Spinner from '../../ui/Spinner';
import Pagination from '../../ui/Pagination';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function BookingTable() {
    const [numbDataPerPage, setNumbDataPerPage] = useState(5);
    const { bookingsData, isLoading, count } = useBookings(numbDataPerPage);
    const [ searchParams, setSearchParams ] = useSearchParams();

    const handleChange = (value) => {
        setNumbDataPerPage(value);
        if(searchParams.get('page')) {
            searchParams.delete('page');
            setSearchParams(searchParams);
        }
    }
    
    if(isLoading) {
        return <Spinner/>
    }

    if(!bookingsData?.length && !isLoading) {
        return <Empty resource="bookings"/>
    }

    return (
        <Menus>
            <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
                <Table.Header>
                    <div>Cabin</div>
                    <div>Guest</div>
                    <div>Dates</div>
                    <div>Status</div>
                    <div>Amount</div>
                    <div></div>
                </Table.Header>
                <Table.Body data={bookingsData} render={(booking) => <BookingRow key={booking.id} booking={booking} />} />
                <Table.Footer>
                    <Pagination count={count} onChange={handleChange} numbDataPerPage={numbDataPerPage}/>
                </Table.Footer>
            </Table>
        </Menus>
    );
}

export default BookingTable;
