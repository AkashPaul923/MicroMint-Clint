import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import TaskCard from "../../../Components/Shared/TaskCard";


const TaskList = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: availableTasks=[], isLoading } = useQuery({
        queryKey: ['available-task'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tasks/available')
            // console.log(res.data);
            return res.data;
        }
    })


    if (isLoading) {
        return (
            <div className="flex justify-center my-[200px]">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }




    return (
        <div className="my-20 px-5">
            <h2 className="text-center text-3xl font-bold mb-14">Task List</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto px-5">
                {
                    availableTasks.map( task => <TaskCard key={task._id} task={task}></TaskCard>)
                }
            </div>
        </div>
    );
};

export default TaskList;