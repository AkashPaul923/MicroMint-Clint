import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const UpdateTask = () => {
    const task = useLoaderData()
    // console.log(task);
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const { register, handleSubmit, reset } = useForm()
           
    const onSubmit = async (data) =>{
        // console.log(data)
        const res = await axiosSecure.patch(`/tasks/${task._id}`, data)
        if(res.data.modifiedCount > 0){
            Swal.fire({
                icon: "success",
                title: "Your task has been updated successfully",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard/my-tasks')
        }
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-center my-14">Update Task</h2>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl mx-auto">
                    {/* Task Title Input */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Task Title</span>
                        </label>
                        <input type="text" defaultValue={task.taskTitle} {...register("taskTitle", { required: true })}    placeholder="Enter your task title" className="input input-bordered bg-transparent   backdrop-blur-lg w-full"/>
                    </div>

                    {/* Submission Info  Input */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Submission Required Info</span>
                        </label>
                        <input type="text" defaultValue={task.submissionInfo} {...register("submissionInfo", { required: true })}    placeholder="Enter your name" className="input input-bordered bg-transparent   backdrop-blur-lg w-full"/>
                    </div>


                    {/* Task Detail Input */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Task Detail</span>
                        </label>
                        <textarea defaultValue={task.taskDetail} {...register("taskDetail", { required: true })} placeholder="Enter your email" className="input input-bordered bg-transparent backdrop-blur-lg w-full min-h-28"/>
                    </div>

                    {/* Submit Button */}
                    <input type="submit" className="btn btn-accent w-full mt-4" value="Update Task" />
                </form> 
            </div>
        </div>
    );
};

export default UpdateTask;