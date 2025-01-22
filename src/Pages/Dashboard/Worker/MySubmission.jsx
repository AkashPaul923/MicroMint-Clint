import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MySubmission = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: submissions = [] } = useQuery({
        queryKey: ["my-submission"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions/${user.email}`);
            // console.log(res.data)
            return res.data;
        },
    });

    return (
        <div>
            <h2 className="text-center text-3xl font-bold my-14">
                My Submissions
            </h2>
            <div className="overflow-x-auto ">
                <table className="table max-w-5xl mx-auto">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Task Title</th>
                            <th>Amount Paid</th>
                            <th>Status</th>
                            <th>Submission Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((submission, idx) => (
                            <tr key={submission._id}>
                                <td>{idx + 1}</td>
                                <td className="min-w-48">{submission.taskTitle}</td>
                                <td>{submission.payableAmount}</td>
                                <td>{submission.status}</td>
                                <td>{submission.submissionDate.split('T')[0]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySubmission;
