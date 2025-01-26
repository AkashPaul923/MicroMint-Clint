import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

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

    console.log(data);

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
                                <th>Payable Amount</th>
                                <th>Submission</th>
                                <th>Status</th>
                                <th>Status Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.reviewSubmissions.map((Submission, idx) => (
                                <tr key={Submission?._id}>
                                    <td>{idx + 1}</td>
                                    <td>{Submission?.workerName}</td>
                                    <td>{Submission?.taskTitle}</td>
                                    <td>${Submission?.payableAmount}</td>
                                    <td>
                                        <button className="btn btn-xs" onClick={() => document.getElementById(`modal-${Submission._id}`).showModal()}>
                                            Show Submissions
                                        </button>
                                    </td>
                                    <td>{Submission?.status}</td>
                                    <td></td>
                                    {/* Modal */}
                                    <dialog id={`modal-${Submission._id}`} className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                    ✕
                                                </button>
                                            </form>
                                            <h3 className="text-lg p-10">
                                                {Submission?.submissionDetail}
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
