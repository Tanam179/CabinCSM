import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "../services/apiAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useLogout = function () {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: logout, isPending } = useMutation({
        mutationFn: signOut,
        onSuccess() {
            queryClient.removeQueries({ queryKey: ['user'] })
            toast.success('Logout successfully');
            navigate('/login', { replace: true })
        }
    })

    return { logout, isPending }
};

export default useLogout;