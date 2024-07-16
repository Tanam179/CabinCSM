import styled from 'styled-components';
import useRecentBookings from '../../hooks/useRecentBookings';
import Spinner from '../../ui/Spinner';
import useRecentStays from '../../hooks/useRecentStays';
import Stats from './Stats';
import useCabins from '../../hooks/useCabins';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

const DashboardLayout = () => {
    const { bookings, isLoading: isLoadingBooking, numbDays } = useRecentBookings();
    const { isLoading: isLoadingStays, confirmedStays } = useRecentStays();
    const { cabinsData, isPending: isLoadingCabin } = useCabins();

    if(isLoadingBooking || isLoadingStays || isLoadingCabin) {
        return <Spinner/>
    }

    return (
        <StyledDashboardLayout>
            <Stats bookings={bookings} confirmedStays={confirmedStays} numbDays={numbDays} cabinCount={cabinsData.length}/>
            <TodayActivity/>
            <DurationChart confirmedStays={confirmedStays}/>
            <SalesChart bookings={bookings} numbDays={numbDays}/>
        </StyledDashboardLayout>
    );
};

export default DashboardLayout;
