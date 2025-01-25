import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";

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

    const handleChangeRole = ({ email, role }) => {
        // console.log({email, role});
        Swal.fire({
            title: "Are you sure to Change Role?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Change it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(
                    `/users/update-role/${email}`,
                    { role }
                );
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "User role has been updated",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    refetch();
                }
            }
        });
    };

    const handleDeleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/user/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "User deleted successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    refetch();
                }
            }
        });
    };


    
    return (
        <div className="my-20">
            <h2 className="text-3xl text-center font-bold mb-14">
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
                                    <select
                                        onChange={(e) =>
                                            handleChangeRole({
                                                email: user.email,
                                                role: e.target.value,
                                            })
                                        }
                                        value={user.role}
                                        className="select select-bordered w-28"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="buyer">Buyer</option>
                                        <option value="worker">Worker</option>
                                    </select>
                                </td>
                                <td>
                                    <button
                                        onClick={() =>
                                            handleDeleteUser(user._id)
                                        }
                                        className="btn"
                                    >
                                        <FaTrashAlt />
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
