import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/apiAuth";


const useUser = function() {
    const { data: user, isLoading, fetchStatus } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser
    });

    return { user, isLoading, fetchStatus, isAuthenticated: user?.role === 'authenticated' };
}

export default useUser;