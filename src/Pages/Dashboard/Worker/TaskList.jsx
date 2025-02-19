import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import TaskCard from "../../../Components/Shared/TaskCard";
import { useState } from "react";


const TaskList = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [availableTasks, setAvailableTasks] = useState([])
    const { data, isLoading } = useQuery({
        queryKey: ['available-task'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tasks/available')
            setAvailableTasks(res.data);
            console.log(res.data);
            return res.data;
        }
    })

    const handleLowToHigh = () => {
        const newData = [...availableTasks].sort((a,b)=> a.payableAmount - b.payableAmount)
        setAvailableTasks(newData)
    }
    const handleHighToLow = () => {
        const newData = [...availableTasks].sort((a,b)=> b.payableAmount - a.payableAmount)
        setAvailableTasks(newData)
    }


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
            <div className=" max-w-7xl mx-auto px-5 text-right mb-3">
                <button onClick={handleLowToHigh} className="btn btn-accent mr-3">Price: Low to High</button>
                <button onClick={handleHighToLow} className="btn btn-accent">Price: High to Low</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto px-5">
                {
                    availableTasks.map( task => <TaskCard key={task._id} task={task}></TaskCard>)
                }
            </div>
        </div>
    );
};

export default TaskList;