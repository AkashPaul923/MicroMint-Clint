import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";

const MySubmission = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [ currentPage, setCurrentPage ] = useState(1)
    const limit = 10


    const { data, isLoading } = useQuery({
        queryKey: ["my-submission", currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions/${user.email}?page=${currentPage}&limit=${limit}`);
            // console.log(res.data)
            return res.data;
        },
    },
    );

    const submissions = data?.submissions || []
    const totalPages = data?.totalPages || 1

    const goToPrevious = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage-1)
        }
    }

    const goToNext = () => {
        if(currentPage < totalPages){
            setCurrentPage(currentPage+1)
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
        <div className="my-20 px-5">
            <h2 className="text-center text-3xl font-bold mb-14">
                My Submissions
            </h2>
            <div className="overflow-x-auto min-h-[500px]">
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
                                <td>{(currentPage -1)*limit + idx + 1}</td>
                                <td className="min-w-48">{submission.taskTitle}</td>
                                <td>{submission.payableAmount}</td>
                                <td>{submission.status}</td>
                                <td>{submission.submissionDate.split('T')[0]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* pagination control */}
            <div className="flex justify-center items-center my-10 gap-5">
                <button onClick={goToPrevious} className="btn" disabled={currentPage === 1}>Previous</button>
                <p className="text-lg">{currentPage}</p>
                <button onClick={goToNext} className="btn" disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default MySubmission;
