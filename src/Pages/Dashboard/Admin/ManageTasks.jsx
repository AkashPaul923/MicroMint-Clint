import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageTasks = () => {
    const axiosSecure = useAxiosSecure();
    const { data: allTask = [], refetch } = useQuery({
        queryKey: ["all task"],
        queryFn: async () => {
            const res = await axiosSecure.get("/all-task");
            return res.data;
        },
    });


    const handleTaskDelete = (id) => {
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
                const res = await axiosSecure.delete(`/tasks/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Task deleted successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    refetch();
                }
            }
        });
    }

    return (
        <div>
            <h2 className="text-3xl text-center font-bold my-14">
                Manage Tasks
            </h2>
            <div className="overflow-x-auto max-w-6xl mx-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Task Title</th>
                            <th>Buyer Email</th>
                            <th>Buyer Name</th>
                            <th>Task Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allTask.map((task, idx) => (
                            <tr key={task._id}>
                                <td>{idx + 1}</td>
                                <td>{task.taskTitle}</td>
                                <td>{task.buyerEmail}</td>
                                <td>{task.buyerName}</td>
                                <td>
                                    <button onClick={()=> handleTaskDelete(task._id)} className="btn">
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

export default ManageTasks;
