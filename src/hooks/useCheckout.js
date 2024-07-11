import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../services/apiBookings"

export const useCheckout = function() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: checkout, isPending: isCheckout } = useMutation({
        mutationFn: (bookingId) => {
            return updateBooking(bookingId, {
                status: 'checked-out',
            })
        },
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} checked out successfully`);
            queryClient.invalidateQueries({ active: true });
            navigate('/')
        },
        onError: (err) => {
            toast.error(`Booking #${err.id} checked out failed`);
        }
    });

    return {
        checkout,
        isCheckout
    }
}