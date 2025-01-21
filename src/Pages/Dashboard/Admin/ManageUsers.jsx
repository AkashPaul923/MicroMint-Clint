import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()

    const { data } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            console.log(res.data);
            return res.data
        }
    })
    return (
        <div>
            <p className="text-3xl text-center">Manage Users</p>
        </div>
    );
};

export default ManageUsers;