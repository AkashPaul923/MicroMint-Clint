import { useLocation } from "react-router-dom";


const Payment = () => {
    const location = useLocation()
    const { coins, dollars } = location.state || {}
    console.log({ coins, dollars });
    return (
        <div>
            
        </div>
    );
};

export default Payment;