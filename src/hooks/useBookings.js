import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const useBookings = function() {
    const [searchParams, setSearchParams] = useSearchParams();

    const filterValue = searchParams.get('status') || 'all';
    const sortByValue = searchParams.get('sortBy') || 'all';
    const currentPage = searchParams.get('page') || 1;

    useEffect(() => {
        if(currentPage === 1) {
            return;
        }

        searchParams.delete('page');
        setSearchParams(searchParams);

    }, [filterValue, sortByValue]);

    console.log(currentPage);


    const { data: bookingsData, isLoading } = useQuery({
        queryKey: ['bookings', { filterValue, sortByValue }],
        queryFn: getBookings
    })

    return { bookingsData, isLoading };
}

export default useBookings;