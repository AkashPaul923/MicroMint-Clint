import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const WorkerHome = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data, isLoading } = useQuery({
        queryKey: ['worker-stats', 'approved-submission'],
        queryFn: async () => {
            const [ stats, approvedSubmissions] = await Promise.all([
                axiosSecure.get(`/worker-stats/${user.email}`).then(res => res.data),
                axiosSecure.get(`/submissions/approved/${user.email}`).then(res => res.data),
            ])
            return { stats, approvedSubmissions }
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
        <div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-5 my-20">
                <div className="bg-base-300 flex flex-col justify-center items-center py-10 px-5 gap-4 text-center rounded-lg border">
                    <p className="text-2xl font-semibold">Total Submission</p>
                    <p className="text-2xl">{data?.stats?.totalSubmission}</p>
                </div>
                <div className="bg-base-300 flex flex-col justify-center items-center py-10 px-5 gap-4 text-center rounded-lg border">
                    <p className="text-2xl font-semibold">Pending Submission</p>
                    <p className="text-2xl">{data?.stats?.totalPending}</p>
                </div>
                <div className="bg-base-300 flex flex-col justify-center items-center py-10 px-5 gap-4 text-center rounded-lg border">
                    <p className="text-2xl font-semibold">Total Earn</p>
                    <p className="text-2xl">${data?.stats?.totalPayable}</p>
                </div>
            </div>
            <div className="my-20 px-5">
                <h2 className="text-3xl text-center font-bold mb-14">
                    Approved Submissions
                </h2>
                <div className="overflow-x-auto max-w-6xl mx-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Task Title</th>
                                <th>Payable Amount (coin)</th>
                                <th>Buyer Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.approvedSubmissions.map((submission, idx) => (
                                <tr key={submission?._id}>
                                    <td>{idx + 1}</td>
                                    <td>{submission?.taskTitle}</td>
                                    <td>{submission?.payableAmount}</td>
                                    <td>{submission?.buyerName}</td>
                                    <td  class="text-green-600">{submission?.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WorkerHome;