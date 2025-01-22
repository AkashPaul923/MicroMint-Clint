import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import TaskCard from "../../../Components/Shared/TaskCard";


const TaskList = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: availableTasks=[] } = useQuery({
        queryKey: ['available-task'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tasks/available')
            console.log(res.data);
            return res.data;
        }
    })
    return (
        <div>
            <h2 className="text-center text-3xl font-bold my-14">Task List</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto px-5">
                {
                    availableTasks.map( task => <TaskCard key={task._id} task={task}></TaskCard>)
                }
            </div>
        </div>
    );
};

export default TaskList;