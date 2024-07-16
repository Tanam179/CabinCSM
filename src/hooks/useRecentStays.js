import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../services/apiBookings";

const useRecentStays = () => {
    const [ searchParams ] = useSearchParams();
    const numbDays = Number(searchParams.get('last')) || 7;
    const queryDate = subDays(new Date(), numbDays).toISOString();

    const { isLoading, data: stays } = useQuery({
        queryKey: ['stays-by-date', `last-${numbDays}`],
        queryFn: () => getStaysAfterDate(queryDate)
    });

    const confirmedStays = stays?.filter(stay => stay.status === 'checked-in' || stay.status === 'checked-out')

    return { isLoading, stays, confirmedStays };
};

export default useRecentStays;