import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getBooking } from "../services/apiBookings"

const useBooking = function() {
    const { bookingId } = useParams();

    const { isLoading, data: booking, error } = useQuery({
        queryKey: ['booking', { bookingId }],
        queryFn: getBooking,
        retry: false
    })

    return { isLoading, booking, error }
}

export default useBooking