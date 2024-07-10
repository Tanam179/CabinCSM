import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateSetting } from "../services/apiSettings";

const useUpdateSetting = function() {
    const queryClient = useQueryClient();
    const { mutate: editSetting, isPending: isUpdating} = useMutation({
        mutationFn: updateSetting,
        onSuccess() {
            toast.success('Edit setting successfully!');
            queryClient.invalidateQueries({
                queryKey: ['settings'],
            });
        },
        onError(err) {
            toast.error(`${err.message}`);
        },
    });

    return { editSetting, isUpdating };
}

export default useUpdateSetting