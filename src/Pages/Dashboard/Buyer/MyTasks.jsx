import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useUser from "../../../Hooks/useUser";
import Swal from "sweetalert2";

const MyTasks = () => {
    const { user } = useAuth();
    const [userRole, refetch, roleLoading] = useUser()
    const axiosSecure = useAxiosSecure();
    const { data: tasks = [], refetch: taskRefetch } = useQuery({
        queryKey: ["tasks", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-tasks/${user.email}`);
            // console.log(res.data);
            return res.data;
        },
    });

    const handleDeleteTask = async (task) => {
        const refundCoin = task.payableAmount * task.requiredWorker
        const totalCoin = userRole.coin + refundCoin
        const res = await axiosSecure.delete(`/tasks/${task._id}`)
        // console.log(res);
        if( res.data.deletedCount > 0 ){
            const coinRes = await axiosSecure.patch(`/update-coin/${task.buyerEmail}`, {coin: totalCoin})
            // console.log(coinRes);
            if(coinRes.data.modifiedCount > 0){
                Swal.fire({
                    // position: "top-end",
                    icon: "success",
                    title: "Your task has been saved successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch()
                taskRefetch()
            }
        }
        
    }



    return (
        <div>
            <h2 className="text-center text-3xl font-bold my-14">My Tasks</h2>
            <div>
                <div className="overflow-x-auto ">
                    <table className="table max-w-5xl mx-auto">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Task Title</th>
                                <th>Completion Date</th>
                                <th>Required Worker</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, idx) => (
                                <tr key={task._id}>
                                    <td>{idx +1}</td>
                                    <td className="min-w-40">{task.taskTitle}</td>
                                    <td>{task.completionDate}</td>
                                    <td>{task.requiredWorker}</td>
                                    <td><Link to={`/dashboard/update-tasks/${task._id}`} className="btn"><FaEdit /></Link></td>
                                    <td><button onClick={()=>handleDeleteTask(task)} className="btn"><FaTrashAlt/></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyTasks;
