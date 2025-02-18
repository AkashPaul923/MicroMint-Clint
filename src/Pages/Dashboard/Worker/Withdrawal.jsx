import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useUser from "../../../Hooks/useUser";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Withdrawal = () => {
    const { user } = useAuth();
    const [userRole, refetch, roleLoading] = useUser();
    const axiosSecure = useAxiosSecure();
    const [withdrawCoin, setWithdrawCoin] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [paymentSystem, setPaymentSystem] = useState("");
    const [accountNumber, setAccountNumber] = useState("");

    // Handle coin input change
    const handleCoinChange = (e) => {
        const coins = Number(e.target.value);
        if (coins <= userRole.coin) {
            setWithdrawCoin(coins);
            setWithdrawAmount(Number((coins / 20).toFixed(2))); // 20 coins = $1
        } else {
            setWithdrawCoin(userRole.coin); // Prevent exceeding total coins
            setWithdrawAmount(Number((userRole.coin / 20).toFixed(2)));
        }
    };

    // Handle form submission
    const handleWithdraw = async (e) => {
        e.preventDefault();
        const withdrawData= {
            withdrawCoin,
            withdrawAmount,
            paymentSystem,
            accountNumber,
            workerName: user.displayName,
            workerEmail: user.email,
            paymentStatus : "Pending",
            withdrawDate: new Date().toISOString()
        }
        const res = await axiosSecure.post('/withdrawals', withdrawData)
        // console.log(res);
        if(res.data.result.insertedId){
            Swal.fire({
                // position: "top-end",
                icon: "success",
                title: "Your withdrawal has been saved for next process",
                showConfirmButton: false,
                timer: 1500
            });
            e.target.reset()
            refetch()
            setWithdrawCoin(0)
            setWithdrawAmount(0)
            setAccountNumber("")
            setPaymentSystem('')
        }
    };

    return (
        <div  className="my-20 px-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto my-12">
                <div className="flex flex-col gap-7 justify-center items-center p-10 rounded-xl bg-base-300 text-2xl font-medium">
                    <p>Total Coin</p>
                    <p>{userRole.coin}</p>
                </div>
                <div className="flex flex-col gap-7 justify-center items-center p-10 rounded-xl bg-base-300 text-2xl font-medium">
                    <p>Withdrawal Amount</p>
                    <p>${(userRole.coin / 20).toFixed(2)}</p>
                </div>
            </div>
            <div className="w-full max-w-4xl mx-auto  rounded-lg shadow-lg p-6">
                <h1 className="text-xl font-bold mb-4 text-center">
                    Withdrawal Form
                </h1>
                <form onSubmit={handleWithdraw}>
                    <div className="grid md:grid-cols-2 gap-5">
                        {/* Coin to Withdraw */}
                        <div className="mb-4">
                            <label
                                htmlFor="coinsToWithdraw"
                                className="block text-sm font-medium "
                            >
                                Coins to Withdraw
                            </label>
                            <input
                                type="number"
                                onChange={handleCoinChange}
                                max={userRole.coin}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder={`Max: ${userRole.coin}`}
                            />
                        </div>

                        {/* Withdraw Amount */}
                        <div className="mb-4">
                            <label
                                htmlFor="withdrawAmount"
                                className="block text-sm font-medium "
                            >
                                Withdraw Amount ($)
                            </label>
                            <input
                                type="number"
                                id="withdrawAmount"
                                value={withdrawAmount}
                                readOnly
                                className="mt-1 block w-full p-2  border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                        {/* Payment System */}
                        <div className="mb-4">
                            <label
                                htmlFor="paymentSystem"
                                className="block text-sm font-medium "
                            >
                                Select Payment System
                            </label>
                            <select
                                id="paymentSystem"
                                value={paymentSystem}
                                onChange={(e) =>
                                    setPaymentSystem(e.target.value)
                                }
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">Select</option>
                                <option value="Bkash">Bkash</option>
                                <option value="Rocket">Rocket</option>
                                <option value="Nagad">Nagad</option>
                                <option value="PayPal">PayPal</option>
                            </select>
                        </div>

                        {/* Account Number */}
                        <div className="mb-4">
                            <label
                                htmlFor="accountNumber"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Account Number
                            </label>
                            <input
                                type="text"
                                id="accountNumber"
                                value={accountNumber}
                                onChange={(e) =>
                                    setAccountNumber(e.target.value)
                                }
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your account number"
                                required
                            />
                        </div>
                    </div>

                    {/* Withdrawal Button or Insufficient Coin Message */}
                    {withdrawCoin < 200 || userRole.coin < 200 ? (
                        <p className="text-red-600 text-center">
                            Insufficient coin
                        </p>
                    ) : (
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
                        >
                            Withdraw
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Withdrawal;
