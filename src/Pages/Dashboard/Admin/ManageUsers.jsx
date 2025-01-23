import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            // console.log(res.data);
            return res.data;
        },
    });


    const handleChangeRole = async ({email, role}) => {
        console.log({email, role});
        const res = await axiosSecure.patch(`/users/update-role/${email}`, {role})
        if(res.data.modifiedCount > 0){
            Swal.fire({
                icon: "success",
                title: "User role has been updated",
                showConfirmButton: false,
                timer: 1500
            });
            refetch()
        }
    }
    return (
        <div>
            <h2 className="text-3xl text-center font-bold my-14">
                Manage Users
            </h2>
            <div className="overflow-x-auto max-w-6xl mx-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Coin</th>
                            <th>Role</th>
                            <th>Role Update</th>
                            <th>User Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => (
                            <tr key={user._id}>
                                <td>{idx + 1}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user.photo}
                                                alt="user image"
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.coin}</td>
                                <td className="capitalize">{user.role}</td>
                                <td>
                                    <select onChange={(e)=>handleChangeRole({email:user.email, role: e.target.value})} value={user.role} className="select select-bordered w-28">
                                        <option value='admin'>Admin</option>
                                        <option value='buyer'>Buyer</option>
                                        <option value='worker'>Worker</option>
                                    </select>
                                </td>
                                <td>
                                    <button className="btn btn-ghost btn-xs">
                                        details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
