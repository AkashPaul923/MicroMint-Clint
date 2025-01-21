import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const PrivateRoute = ({children}) => {
    const { user, loader } = useAuth()
    
    if(loader){
        return <div className='min-h-screen'><span className="loading loading-spinner text-accent block mt-40 mx-auto"></span></div>
    }
    if(user){
        return children
    }
    console.log(user);
    return <Navigate to='/login'></Navigate>

};

export default PrivateRoute;