import { useQuery } from "@tanstack/react-query"
import { getSettings } from "../services/apiSettings"

const useSettings = function() {
    const { isPending, error, data: settings } = useQuery({
        queryKey: ['settings'],
        queryFn: getSettings
    })

    return { isPending, error, settings }
}

export default useSettings