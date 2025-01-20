import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useUser from "../Hooks/useUser";


const WorkerRoute = ({children}) => {
    const { user, loader } = useAuth()
    const [userRole, refetch , roleLoading] = useUser()
    
    if( loader || roleLoading ){
        return <div className='min-h-screen'><span className="loading loading-spinner text-accent block mt-40 mx-auto"></span></div>
    }
    if(user && userRole.role === "worker"){
        return children
    }

    return <Navigate to='/'></Navigate>

};

export default WorkerRoute;