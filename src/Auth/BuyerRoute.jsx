import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useUser from "../Hooks/useUser";


const BuyerRoute = ({children}) => {
    const { user, loader } = useAuth()
    const [userRole, refetch , roleLoading] = useUser()
    
    if( loader || roleLoading ){
        return <div className='min-h-screen'><span className="loading loading-spinner text-accent block mt-40 mx-auto"></span></div>
    }
    // console.log(userRole);
    if(user && userRole.role === "buyer"){
        return children
    }
    // console.log(user);
    // console.log(userRole);
    return <Navigate to='/'></Navigate>

};

export default BuyerRoute;