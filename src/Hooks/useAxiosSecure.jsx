import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecureInstance = axios.create({
    baseURL: "http://localhost:5000",
});
const useAxiosSecure = () => {
    const { logout,} = useAuth()
    const navigate = useNavigate()
    // Add a request interceptor
    axiosSecureInstance.interceptors.request.use( (config) => {
            // Do something before request is sent
            const token = localStorage.getItem("access-token")
            // console.log(token);
            config.headers.authorization = `Bearer ${token}`
            return config;
        },
        (error) => {
            // Do something with request error
            return Promise.reject(error);
        }
    );

    // Add a response interceptor
    axiosSecureInstance.interceptors.response.use( (response) => {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        },
        async (error) => {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            const status = error.response.status
            if(status === 400 || status === 401 || status === 403){
                await logout()
                navigate('/login')
            }

            return Promise.reject(error);
        }
    );

    return axiosSecureInstance;
};

export default useAxiosSecure;
