import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../services/apiBookings"

export const useCheckin = function() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: checkin, isPending: isCheckinIn } = useMutation({
        mutationFn: ({bookingId, breakfast}) => {
            return updateBooking(bookingId, {
                status: 'checked-in',
                isPaid: true,
                ...breakfast
            })
        },
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} checked in successfully`);
            queryClient.invalidateQueries({ active: true });
            navigate('/')
        },
        onError: (err) => {
            toast.error(`Booking #${err.id} checked in failed`);
        }
    });

    return {
        checkin,
        isCheckinIn
    }
}