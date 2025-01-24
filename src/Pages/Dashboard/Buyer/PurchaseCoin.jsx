import { FaCoins } from "react-icons/fa";
import { Link } from "react-router-dom";

const PurchaseCoin = () => {
    const exchanges = [
        { coins: 10, dollars: 1 },
        { coins: 110, dollars: 10 },
        { coins: 600, dollars: 50 },
        { coins: 1300, dollars: 100 },
    ];

    return (
        <div>
            <h2 className="text-center text-3xl font-bold my-14">
                Purchase Coin
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-6 p-8 my-20">
                {exchanges.map((exchange, index) => (
                    <div
                        key={index}
                        className="card w-64 bg-gradient-to-r from-base-200 to-base-300 shadow-xl rounded-lg"
                    >
                        <div className="card-body items-center text-center gap-6">
                            <FaCoins
                                size={50}
                                className="text-yellow-400 mb-4"
                            />
                            <h2 className="card-title text-2xl font-bold">
                                {exchange.coins} Coins
                            </h2>
                            <div className="flex items-center gap-2 text-lg font-medium mt-2">
                                {exchange.dollars}$
                            </div>
                            <Link
                                to="/dashboard/payment"
                                state={exchange}
                                className="btn btn-accent  w-full border-none"
                            >
                                Purchase
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PurchaseCoin;
