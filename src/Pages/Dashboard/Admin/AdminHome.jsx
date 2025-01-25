import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";




const AdminHome = () => {
    const axiosSecure = useAxiosSecure()

    const { data, isLoading, refetch } = useQuery({
        queryKey: [ 'admin-stats', 'withdraws'],
        queryFn: async () => {
            const [ stats , withdraws ] = await Promise.all([
                axiosSecure.get('/admin-stats')
                .then( res => res.data),
                axiosSecure.get('/withdraw-request')
                .then( res => res.data),
            ])
            return { stats, withdraws }
        }
    })

    const handleStatusUpdate = ( id ) =>{
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
                const res = await axiosSecure.patch(`/withdrawals/${id}`)
                if(res.data.modifiedCount > 0){
                    Swal.fire({
                        icon: "success",
                        title: "Withdrawal status updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }
              
            }
        });
    }


    if(isLoading){
        return  <div className="flex justify-center my-[200px]">
                    <span className="loading loading-bars loading-lg"></span>
                </div>
    }

    return (
        <div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 px-5 my-20">
                <div className="bg-base-300 flex flex-col justify-center items-center py-10 px-5 gap-4 text-center rounded-lg border">
                    <p className="text-2xl font-semibold">Total Admin</p>
                    <p className="text-2xl">{data?.stats?.totalAdmin}</p>
                </div>
                <div className="bg-base-300 flex flex-col justify-center items-center py-10 px-5 gap-4 text-center rounded-lg border">
                    <p className="text-2xl font-semibold">Total Buyer</p>
                    <p className="text-2xl">{data?.stats?.totalBuyer}</p>
                </div>
                <div className="bg-base-300 flex flex-col justify-center items-center py-10 px-5 gap-4 text-center rounded-lg border">
                    <p className="text-2xl font-semibold">Total Worker</p>
                    <p className="text-2xl">{data?.stats?.totalWorker}</p>
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
                                        <th>Worker Email</th>
                                        <th>Account no.</th>
                                        <th>Amount</th>
                                        <th>Coin</th>
                                        <th>Status</th>
                                        <th>Status Update</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.withdraws.map((withdraw, idx) => (
                                        <tr key={withdraw?._id}>
                                            <td>{idx + 1}</td>
                                            <td>{withdraw?.workerEmail}</td>
                                            <td>{withdraw?.accountNumber}</td>
                                            <td>${withdraw?.withdrawAmount}</td>
                                            <td>{withdraw?.withdrawCoin}</td>
                                            <td className="capitalize">{withdraw?.paymentStatus}</td>
                                            <td>
                                                <button onClick={()=>handleStatusUpdate(withdraw?._id)} className="btn"><FaEdit/></button>
                                            </td>
                                            <td>{withdraw?.withdrawDate.split('T')[0]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
        </div>
    );
};

export default AdminHome;