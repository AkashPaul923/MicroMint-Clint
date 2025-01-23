import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe( import.meta.env.VITE_Payment_Gateway_PK )

const Payment = () => {
    const location = useLocation()
    const { coins, dollars } = location.state || {}
    // console.log({ coins, dollars });
    return (
        <div>
            <h2 className="text-center text-3xl font-bold my-14">Payment</h2>
            <Elements stripe={stripePromise}>
                <CheckoutForm coins={coins} dollars={dollars} />
            </Elements>
        </div>
    );
};

export default Payment;