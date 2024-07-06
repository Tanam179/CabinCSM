import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../services/apiCabins";
import { toast } from "react-toastify";

const useDeleteCabin = function() {
    //THIS USEQUERYCLIENT HOOK IS TO GET THE QUERYCLIENT INSTANCE FROM APP.JSX
    const queryClient = useQueryClient();
    const { isPending, mutate } = useMutation({
        mutationFn: deleteCabin,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['cabins'] });
            toast.success('Delete cabin successfully!');
        },
        onError(err) {
            toast.error(`${err.message}`);
        },
        retry: 1,
    });

    return { isPending, mutate };
}

export default useDeleteCabin;