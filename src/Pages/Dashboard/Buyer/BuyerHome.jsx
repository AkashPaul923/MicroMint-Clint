import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const BuyerHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["buyer-stats", "task-to-review"],
        queryFn: async () => {
            const [stats, reviewSubmissions] = await Promise.all([
                axiosSecure
                    .get(`/buyer-stats/${user.email}`)
                    .then((res) => res.data),
                axiosSecure
                    .get(`/submissions/task-to-review/${user.email}`)
                    .then((res) => res.data),
            ]);
            return { stats, reviewSubmissions };
        },
    });

    const handleChangeStatus = ({submission, status}) => {
        // console.log({ submission, status});
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it!"
        }).then( async (result) => {
            if (result.isConfirmed) {
                const changeData = {
                    newStatus : status,
                    workerEmail: submission.workerEmail,
                    incCoin : submission.payableAmount,
                    taskId : submission.taskId
                }
                const res = await axiosSecure.patch(`/submissions/${submission._id}`, changeData )
                // console.log(res);
                if( res.data.modifiedCount > 0 ){
                    Swal.fire({
                        icon: "success",
                        title: "Submission status has been updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }
            }
        });
    }

    if (isLoading) {
        return (
            <div className="flex justify-center my-[200px]">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    return (
        <div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-5 my-20">
                <div className="bg-base-300 flex flex-col justify-center items-center py-10 px-5 gap-4 text-center rounded-lg border">
                    <p className="text-2xl font-semibold">Total Task</p>
                    <p className="text-2xl">{data?.stats?.totalTask}</p>
                </div>
                <div className="bg-base-300 flex flex-col justify-center items-center py-10 px-5 gap-4 text-center rounded-lg border">
                    <p className="text-2xl font-semibold">Pending Task</p>
                    <p className="text-2xl">{data?.stats?.pendingTask}</p>
                </div>
                <div className="bg-base-300 flex flex-col justify-center items-center py-10 px-5 gap-4 text-center rounded-lg border">
                    <p className="text-2xl font-semibold">Total Payment</p>
                    <p className="text-2xl">{data?.stats?.totalPayment}</p>
                </div>
            </div>
            <div className="my-20 px-5">
                <h2 className="text-3xl text-center font-bold mb-14">
                    Pending Withdrawals
                </h2>
                <div className="overflow-x-auto max-w-6xl mx-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Worker Name</th>
                                <th>Task Title</th>
                                <th>Payable Coin</th>
                                <th>Submission</th>
                                <th>Status</th>
                                <th>Status Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.reviewSubmissions.map((submission, idx) => (
                                <tr key={submission?._id}>
                                    <td>{idx + 1}</td>
                                    <td>{submission?.workerName}</td>
                                    <td>{submission?.taskTitle}</td>
                                    <td>{submission?.payableAmount}</td>
                                    <td>
                                        <button className="btn btn-xs" onClick={() => document.getElementById(`modal-${submission._id}`).showModal()}>
                                            Show Submissions
                                        </button>
                                    </td>
                                    <td>{submission?.status}</td>
                                    <td>
                                        <select 
                                            onChange={(e) => handleChangeStatus({ submission, status: e.target.value })}
                                            value={submission?.status}
                                            className="select select-bordered w-28"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </td>
                                    {/* Modal */}
                                    <dialog id={`modal-${submission._id}`} className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                    ✕
                                                </button>
                                            </form>
                                            <h3 className="text-lg p-10">
                                                {submission?.submissionDetail}
                                            </h3>
                                        </div>
                                    </dialog>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BuyerHome;
