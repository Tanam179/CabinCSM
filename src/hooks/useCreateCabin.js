import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../services/apiCabins";
import { toast } from "react-toastify";

const useCreateCabin = function() {
    const queryClient = useQueryClient();

    const { mutate: addNewCabin, isPending: isAdding } = useMutation({
        mutationFn: createEditCabin,
        onSuccess() {
            toast.success('Create cabin successfully!');
            queryClient.invalidateQueries({ queryKey: ['cabins'] });
        },
        onError(err) {
            toast.error(`${err.message}`);
        },
    });

    return { addNewCabin, isAdding }
}

export default useCreateCabin;