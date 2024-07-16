import { useMutation } from "@tanstack/react-query";
import { signup } from "../services/apiAuth";
import { toast } from "react-toastify";

export default function useSignup () {
    const { mutate: signupApi, isPending } = useMutation({
        mutationFn: signup,
        onSuccess(user) {
            console.log(user);
            toast.success('Account successfully created')
        },
        onError(err) {
            toast.error(err.message)
        }
    })

    return { signupApi, isPending }
}