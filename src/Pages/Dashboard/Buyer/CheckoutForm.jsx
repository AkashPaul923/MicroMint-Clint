import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = () => {
    const [ error, setError] = useState('')
    const [ transactionId, setTransactionId] = useState('')
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(!stripe || !elements){
            return
        }

        const card = elements.getElement(CardElement)

        if(card === null){
            return
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card
        })

        if(error){
            console.log("error", error);
            setError(error.message)
        }
        else{
            console.log("paymentMethod", paymentMethod);
            setError('')
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto my-20 rounded-xl px-5 py-10 border ">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />
                <button className="btn btn-accent my-10" type="submit" disabled={!stripe}>
                    Pay
                </button>
                <p className="text-red-500">{error}</p>
            </form>
        </>
    );
};

export default CheckoutForm;
