import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../services/apiBookings";

const useRecentBookings = () => {
    const [ searchParams ] = useSearchParams();
    const numbDays = Number(searchParams.get('last')) || 7;
    const queryDate = subDays(new Date(), numbDays).toISOString();

    const { isLoading, data: bookings } = useQuery({
        queryKey: ['bookings-by-date', `last-${numbDays}`],
        queryFn: () => getBookingsAfterDate(queryDate)
    })

    return { isLoading, bookings, numbDays };
};

export default useRecentBookings;