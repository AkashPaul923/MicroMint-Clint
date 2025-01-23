import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const CheckoutForm = ({ coins, dollars }) => {
    const { user } = useAuth()
    const [ error, setError] = useState('')
    const [ transactionId, setTransactionId] = useState('')
    const [clientSecret, setClientSecret] = useState("")
    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    console.log({ coins, dollars });

    useEffect(()=>{
        axiosSecure.post('/create-payment-intent', { price: dollars })
        .then( res => {
            console.log(res.data);
            setClientSecret(res.data.clientSecret)
        })
    },[])
    

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

        // confirm payment
        const { paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card: card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous"
                }
            }
        })

        if(confirmError){
            setError('Confirm Error')
        }
        else{
            if(paymentIntent.status === "succeeded"){
                setTransactionId(paymentIntent.id)
            }
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
                <button className="btn btn-accent my-10" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className="text-red-500">{error}</p>
                {transactionId && <p className="text-green-500">Transaction Id: {transactionId}</p>}
            </form>
        </>
    );
};

export default CheckoutForm;
