import { Link, useNavigate } from "react-router-dom";
import registerImg from "../../assets/image/login.png";
import registerBg from "../../assets/image/loginBg2.jpg";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/Shared/SocialLogin";
import useUser from "../../Hooks/useUser";
import { useEffect } from "react";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Register = () => {
    const [userRole, refetch, roleLoading] = useUser();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { user, setUser, createUser, profileUpdate } = useAuth();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    let coin = 0;
    const onSubmit = (data) => {
        console.log(data);
        if (data.role === "buyer") {
            coin = 50;
        } else if (data.role === "worker") {
            coin = 10;
        } else {
            coin = 0;
        }
        const imgFile = { image: data.photo[0] };
        // console.log(imgFile);
        axiosPublic
            .post(imageHostingAPI, imgFile, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((ImgRes) => {
                console.log(ImgRes.data);
                if (ImgRes.data.success) {
                    createUser(data.email, data.password).then((res) => {
                        // console.log(res);
                        profileUpdate(data.name, ImgRes.data.data.display_url).then(() => {
                            setUser({
                                ...res.user,
                                displayName: data.name,
                                photoURL: ImgRes.data.data.display_url,
                            });
                            const userData = {
                                email: data.email,
                                name: data.name,
                                role: data.role,
                                photo: ImgRes.data.data.display_url,
                                coin: coin,
                            };
                            axiosPublic.post("/users", userData).then((res) => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        // position: "top-end",
                                        icon: "success",
                                        title: "Successfully Register Account",
                                        showConfirmButton: false,
                                        timer: 1500,
                                    });
                                    refetch();
                                    // TODO: Redirect user
                                    // navigate(`/dashboard/${data.role}-home`)
                                }
                            });
                        });
                    });
                }
            });
    };

    useEffect( ()=> {
        if(user && userRole.role){
            navigate(`/dashboard/${userRole?.role}-home`)
        }
    },[user, userRole])

    return (
        <div
            className="flex items-center justify-center min-h-screen font-sans"
            style={{ backgroundImage: `url(${registerBg})` }}
        >
            <div className=" rounded-lg shadow-xl shadow-slate-700 p-8 max-w-6xl flex w-11/12 border-2">
                {/* Left Side: Login Form */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-2xl font-bold text-center mb-6">
                        Register Account
                    </h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {/* Name Input */}
                        <div className="form-control w-full col-span-3">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                placeholder="Enter your name"
                                className="input input-bordered bg-transparent   backdrop-blur-lg w-full"
                            />
                            {errors.name && (
                                <span className="text-red-500">
                                    This field is required
                                </span>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-4">
                            {/* Role Input */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Role</span>
                                </label>
                                <select
                                    {...register("role", { required: true })}
                                    className="select select-bordered bg-transparent   backdrop-blur-lg w-full"
                                >
                                    <option value="">Chose One</option>
                                    <option value="worker">Worker</option>
                                    <option value="buyer">Buyer</option>
                                </select>
                                {errors.role && (
                                    <span className="text-red-500">
                                        This field is required
                                    </span>
                                )}
                            </div>

                            {/* photo Input */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">
                                        Photo URL
                                    </span>
                                </label>
                                <input
                                    type="file"
                                    {...register("photo", { required: true })}
                                    class="file-input file-input-bordered file-input-accent bg-transparent backdrop-blur-lg w-full"
                                />
                                {errors.photo && (
                                    <span className="text-red-500">
                                        This field is required
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                placeholder="Enter your email"
                                className="input input-bordered bg-transparent backdrop-blur-lg w-full"
                            />
                            {errors.name && (
                                <span className="text-red-500">
                                    This field is required
                                </span>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: true,
                                    pattern:
                                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/,
                                })}
                                placeholder="Enter your password"
                                className="input input-bordered bg-transparent backdrop-blur-lg w-full"
                            />
                            {errors.password && (
                                <span className="text-red-500">
                                    Password must be an uppercase, a lowercase,
                                    a number and minimum six character
                                </span>
                            )}
                        </div>

                        {/* Submit Button */}
                        <input
                            type="submit"
                            className="btn btn-accent w-full mt-4"
                            value="Sign Up"
                        />
                    </form>

                    {/* Additional Options */}
                    <div className="text-center mt-4">
                        <p className="text-sm ">
                            Already have account?
                            <Link to="/login" className="font-bold ml-2">
                                Please login
                            </Link>
                        </p>
                        <p className="text-sm mt-2">Or sign in with</p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>

                {/* Right Side: Illustration */}
                <div className="hidden md:flex md:w-1/2 justify-center items-center">
                    <img
                        src={registerImg}
                        alt="Illustration"
                        className="w-full h-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;
