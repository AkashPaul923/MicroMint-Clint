import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const TaskDetail = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const {id} = useParams()
    const { data : task = {}, isLoading } = useQuery({
        queryKey: ['task', id],
        queryFn: async() => {
            const res = await axiosSecure.get(`/tasks/${id}`)
            return res.data
        }
    })



    const { _id, taskImage, taskTitle, taskDetail, buyerEmail, buyerName, completionDate, payableAmount, requiredWorker, submissionInfo} = task
    console.log(id);

    const handleTaskSubmit = async ( e ) => {
        e.preventDefault()
        const submissionDetail = e.target.submissionDetail.value
        // console.log(submissionDetail);
        const submittedTaskInfo = {
            submissionDetail,
            taskTitle,  
            buyerEmail, 
            buyerName,  
            payableAmount,
            taskId: _id,
            workerName: user.displayName,
            workerEmail: user.email,
            submissionDate: new Date().toISOString(),
            status: "Pending"
        }
        // console.log(submittedTaskInfo);
        const res = await axiosSecure.post('/submissions', submittedTaskInfo)
        if(res.data.result.insertedId){
            Swal.fire({
                // position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard/my-submission')
        }
    }




    if (isLoading) {
        return (
            <div className="flex justify-center my-[200px]">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }



    return (
        <div className="min-h-screen flex justify-center items-center p-4">
            <div className="w-full max-w-7xl bg-base-100 shadow-lg rounded-lg overflow-hidden my-14">
                {/* Task Image */}
                {taskImage && (
                    <img
                        src={taskImage}
                        alt="Task"
                        className="w-full h-64 lg:h-72 object-cover"
                    />
                )}

                {/* Task Details */}
                <div className="p-6">
                    <h1 className="text-2xl font-bold  mb-4">
                        {taskTitle}
                    </h1>
                    <p className=" text-sm mb-4">
                        {taskDetail}
                    </p>

                    {/* Buyer Information */}
                    <div className="mb-4">
                        <p className=" text-sm">
                            <strong>Buyer Name:</strong> {buyerName}
                        </p>
                        <p className=" text-sm">
                            <strong>Buyer Email:</strong> {buyerEmail}
                        </p>
                    </div>

                    {/* Additional Task Info */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className=" ">
                            <strong>Completion Date:</strong>{" "}
                            {completionDate}
                        </div>
                        <div className=" ">
                            <strong>Payable Amount:</strong> $
                            {payableAmount}
                        </div>
                        <div className=" ">
                            <strong>Required Workers:</strong>{" "}
                            {requiredWorker}
                        </div>
                        <div className=" ">
                            <strong>Submission Info:</strong>{" "}
                            {submissionInfo}
                        </div>
                    </div>

                    {/* Submission Form */}
                    <div className=" p-4 rounded-lg">
                        <h2 className="text-lg font-bold  mb-4">Submit Your Work</h2>
                        <form onSubmit={handleTaskSubmit}>
                            {/* Submission Details (Text Area) */}
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">
                                    Submission Details
                                </label>
                                <textarea
                                    name="submissionDetail"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your submission details here..."
                                    rows="5"
                                    required
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="btn btn-accent w-full py-2 rounded-lg"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetail;
