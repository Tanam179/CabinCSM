import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
// import { useEffect } from 'react';

const useBookings = function (numberDataPerPage) {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    const filterValue = searchParams.get('status') || 'all';
    const sortByValue = searchParams.get('sortBy') || 'all';
    const currentPage = Number(searchParams.get('page')) || 1;

    const { data, isLoading } = useQuery({
        queryKey: ['bookings', { filterValue, sortByValue, currentPage, numberDataPerPage }],
        queryFn: getBookings,
    });
    
    const bookingsData = data?.data;
    const count = data?.count;

    const maxPage = Math.ceil(count / numberDataPerPage);

    if(currentPage < maxPage) {
        queryClient.prefetchQuery({
            queryKey: ['bookings', { filterValue, sortByValue, currentPage: Number(currentPage) + 1, numberDataPerPage }],
            queryFn: getBookings,
        });
    }


    return { bookingsData, isLoading, count };
};

export default useBookings;
