import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useUser from "../../Hooks/useUser";
import { useEffect } from "react";

const SocialLogin = () => {
    const [userRole, refetch, roleLoading] = useUser()
    const { user, googleSignin } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const handleGoogleLogin = () =>{
        googleSignin()
        .then( res => {
            console.log(res.user);
            const userData = {
                email: res?.user?.email,
                name: res?.user?.displayName,
                role: 'worker',
                photo: res?.user?.photoURL,
                coin: 10,
            }
            axiosPublic.post('/users', userData)
            .then( res => {
                Swal.fire({
                    icon: "success",
                    title: "Successfully login",
                    showConfirmButton: false,
                    timer: 1500
                });
                
                // navigate(`/dashboard/worker-home`)
            })
        })
    }

    useEffect( ()=> {
        refetch()
        if(user && userRole?.role){
            navigate(`/dashboard/${userRole?.role}-home`)
        }
    },[user, userRole])

    return (
        <div className="my-3">
            <button onClick={handleGoogleLogin} className="btn">
                <img
                    className="w-6"
                    src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                    alt=""
                />
                <p>Login with Google</p>
            </button>
        </div>
    );
};

export default SocialLogin;
