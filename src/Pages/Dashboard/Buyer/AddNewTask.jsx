import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUser from "../../../Hooks/useUser";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const imageHostingKey= import.meta.env.VITE_IMAGE_HOSTING_KEY
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`

const AddNewTask = () => {
    const {user} = useAuth()
    const [userRole, refetch, roleLoading] = useUser()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const { register, formState: { errors }, handleSubmit, reset } = useForm()
       
    const onSubmit = async (data) =>{
        // console.log(data);
        const totalAmount = parseFloat(data.payableAmount) * parseInt(data.requiredWorker)
        // console.log(totalAmount);
        // console.log(userRole.coin);
        if(totalAmount > userRole.coin) {
            Swal.fire({
                // position: "top-end",
                icon: "error",
                title: "You do not have enough coin. Please buy coin",
                showConfirmButton: false,
                timer: 1500
            });
             return navigate("/")   
        }
        const newCoin = userRole.coin - totalAmount
        const imgFile = { image : data.taskImg[0] }
        // console.log(imgFile);
        const ImgRes = await axiosPublic.post(imageHostingAPI, imgFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        // console.log(ImgRes.data);
        if(ImgRes.data.success){
            const taskInfo = {
                taskImage: ImgRes.data.data.display_url,
                completionDate: data.completionDate,
                payableAmount: parseFloat(data.payableAmount),
                requiredWorker: parseInt(data.requiredWorker),
                submissionInfo: data.submissionInfo,
                taskDetail: data.taskDetail,
                taskTitle: data.taskTitle,
                buyerEmail: user.email,
                buyerName: user.displayName,
            }
            // console.log(taskInfo);
            const taskRes = await axiosSecure.post('/tasks', taskInfo)
            if( taskRes.data.insertedId){
                const coinRes = await axiosSecure.patch(`/update-coin/${user.email}`, {coin: newCoin})
                if(coinRes.data.modifiedCount >0){
                    Swal.fire({
                        // position: "top-end",
                        icon: "success",
                        title: "Your task has been saved successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                    reset()
                }
            }

        }
    }


    return (
        <div>
            <h2 className="text-3xl font-bold text-center mb-6">Add a New Task</h2>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl mx-auto">
                    {/* Task Title Input */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Task Title</span>
                        </label>
                        <input type="text" {...register("taskTitle", { required: true })}    placeholder="Enter your task title" className="input input-bordered bg-transparent   backdrop-blur-lg w-full"/>
                        {errors.taskTitle && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
                        {/* Required Worker Input */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Required Worker</span>
                            </label>
                            <input type="number" {...register("requiredWorker", { required: true , min: 1})}    placeholder="Enter your name" className="input input-bordered bg-transparent   backdrop-blur-lg w-full"/>
                            {errors.requiredWorker && <span className="text-red-500">This field is required</span>}
                        </div>
                        {/* Payable Amount Input */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Payable Amount for each</span>
                            </label>
                            <input type="number" {...register("payableAmount", { required: true , min: 0.01})}    placeholder="Enter your name" className="input input-bordered bg-transparent   backdrop-blur-lg w-full"/>
                            {errors.payableAmount && <span className="text-red-500">This field is required</span>}
                        </div>
                        {/* Completion Date  Input */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Completion Date</span>
                            </label>
                            <input type="date" {...register("completionDate", { required: true })}    placeholder="Enter your name" className="input input-bordered bg-transparent   backdrop-blur-lg w-full"/>
                            {errors.completionDate && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>

                    {/* Submission Info  Input */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Submission Required Info</span>
                        </label>
                        <input type="text" {...register("submissionInfo", { required: true })}    placeholder="Enter your name" className="input input-bordered bg-transparent   backdrop-blur-lg w-full"/>
                        {errors.submissionInfo && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* task img  Input */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Task Image</span>
                        </label>
                        <input type="file" {...register("taskImg", { required: true })}    placeholder="Enter your name" className="file-input file-input-bordered file-input-sm bg-transparent backdrop-blur-lg w-full"/>
                        {errors.taskImg && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* Task Detail Input */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Task Detail</span>
                        </label>
                        <textarea {...register("taskDetail", { required: true })} placeholder="Enter your email" className="input input-bordered bg-transparent backdrop-blur-lg w-full min-h-28"/>
                        {errors.taskDetail && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* Submit Button */}
                    <input type="submit" className="btn btn-accent w-full mt-4" value="Add Task" />
                </form> 
            </div>
        </div>
    );
};

export default AddNewTask;