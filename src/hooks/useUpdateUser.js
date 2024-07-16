import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateUser as updateUserApi } from "../services/apiAuth";

const useUpdateUser = () => {
    const queryClient = useQueryClient();
    const { mutate: updateUser, isPending: isUpdating} = useMutation({
        mutationFn: updateUserApi,
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['user'],
            });
        },
        onError(err) {
            toast.error(`${err.message}`);
        },
    });

    return { updateUser, isUpdating };
};

export default useUpdateUser;