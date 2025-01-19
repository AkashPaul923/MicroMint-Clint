import { Link } from "react-router-dom";
import registerImg from "../../assets/image/login.png";
import registerBg from "../../assets/image/loginBg2.jpg";
import { useForm } from "react-hook-form";

const Register = () => {
    const { register, formState: { errors }, handleSubmit } = useForm()
    const onSubmit = (data) => {
        console.log(data)
    }


    return (
        <div className="flex items-center justify-center min-h-screen font-sans" style={{ backgroundImage: `url(${registerBg})`}}>
        <div className=" rounded-lg shadow-xl shadow-slate-700 p-8 max-w-6xl flex w-11/12 border-2">

            {/* Left Side: Login Form */}
            <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-bold text-center mb-6">Register Account</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name Input */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name", { required: true })} placeholder="Enter your name" className="input input-bordered bg-transparent backdrop-blur-lg w-full"/>
                        {errors.name && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* photo Input */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="URL" {...register("photo", { required: true })} placeholder="Enter your photo URL" className="input input-bordered bg-transparent backdrop-blur-lg w-full"/>
                        {errors.photo && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* Email Input */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", { required: true })} placeholder="Enter your email" className="input input-bordered bg-transparent backdrop-blur-lg w-full"/>
                        {errors.name && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* Password Input */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password",{required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/})} placeholder="Enter your password" className="input input-bordered bg-transparent backdrop-blur-lg w-full"/>
                        {errors.password && <span className="text-red-500">Password must be an uppercase, a lowercase and minimum six character</span>}
                    </div>

                    {/* Submit Button */}
                    <input type="submit" className="btn btn-accent w-full mt-4" value="Sign Up" />
                </form>

                {/* Additional Options */}
                <div className="text-center mt-4">
                    <p className="text-sm ">Already have account?<Link to='/login' className="font-bold ml-2">Please login</Link></p>
                    <p className="text-sm mt-2">Or sign in with</p>
                    {/* <SocialLogin></SocialLogin> */}
                </div>
            </div>

            {/* Right Side: Illustration */}
            <div className="hidden md:flex md:w-1/2 justify-center items-center">
                <img src={registerImg}  alt="Illustration" className="w-full h-auto"/>
            </div>

        </div>
    </div>
    );
};

export default Register;
