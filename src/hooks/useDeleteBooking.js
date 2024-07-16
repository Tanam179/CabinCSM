import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteBooking } from "../services/apiBookings"
import { toast } from "react-toastify";

const useDeleteBooking = function() {
    const queryClient = useQueryClient();
    
    const { mutate, isPending } = useMutation({
        mutationFn: deleteBooking,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
            toast.success('Delete booking successfully!');
        }
    })

    return { mutate, isPending }
}

export default useDeleteBooking;