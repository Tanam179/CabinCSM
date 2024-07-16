import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useLogin = function () {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: login, isPending } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (user) => {
            console.log(user);
            queryClient.setQueryData(['user'], user.user)
            navigate('/', { replace: true })
        },
        onError: (error) => {
            console.error('Error logging in:', error);
            toast.error('Provide email or password is incorrect')
        },
    });

    return {
        login,
        isPending,
    };
};

export default useLogin;
