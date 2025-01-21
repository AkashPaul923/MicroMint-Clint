import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const MyTasks = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: tasks = [] } = useQuery({
        queryKey: ["tasks", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks/${user.email}`);
            console.log(res.data);
            return res.data;
        },
    });




    
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
                                    <td>
                                        <button className="btn"><FaEdit /></button>
                                    </td>
                                    <td>
                                        <button className="btn"><FaTrashAlt/></button>
                                    </td>
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
