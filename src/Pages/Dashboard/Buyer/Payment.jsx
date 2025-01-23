import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe( import.meta.env.VITE_Payment_Gateway_PK )

const Payment = () => {
    const location = useLocation()
    const { coins, dollars } = location.state || {}
    console.log({ coins, dollars });
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
};

export default Payment;