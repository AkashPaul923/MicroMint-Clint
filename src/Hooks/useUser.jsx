import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useUser = () => {
    const {user, loader} = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: userRole = {}, refetch, isPending: roleLoading} = useQuery({
        queryKey: [ 'user-role', user?.email ],
        enabled: !loader,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user?.email}`)
            return res.data
        }
    })

    return [ userRole , refetch, roleLoading ]
};

export default useUser;