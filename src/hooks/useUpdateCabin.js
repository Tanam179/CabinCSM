import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../services/apiCabins";
import { toast } from "react-toastify";

const useUpdateCabin = function() {
    const queryClient = useQueryClient();
    const { mutate: editCabin, isPending: isUpdating} = useMutation({
        mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
        onSuccess() {
            toast.success('Edit cabin successfully!');
            queryClient.invalidateQueries({
                queryKey: ['cabins'],
            });
        },
        onError(err) {
            toast.error(`${err.message}`);
        },
    });

    return { editCabin, isUpdating };
}

export default useUpdateCabin