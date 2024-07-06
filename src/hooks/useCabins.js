import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../services/apiCabins";

const useCabins = function() {
    const { data: cabinsData, isPending } = useQuery({
        queryKey: ['cabins'],
        queryFn: getCabins,
    });

    return {
        cabinsData, isPending,
    };
}

export default useCabins;