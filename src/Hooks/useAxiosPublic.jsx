import axios from "axios";

const axiosPublicInstance = axios.create({
    baseURL: "https://micro-mint-server-two.vercel.app",
})
const useAxiosPublic = () => {

    return axiosPublicInstance;

};

export default useAxiosPublic;