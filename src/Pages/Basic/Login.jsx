import { Link } from "react-router-dom";
import loginImg from "../../assets/image/login.png";
import loginBg from "../../assets/image/loginBg2.jpg";

const Login = () => {
    return (
        <div
            className="flex items-center justify-center min-h-screen font-sans"
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            <div className=" rounded-lg shadow-xl shadow-slate-700 p-8 max-w-6xl flex w-11/12 border-2">
                {/* Left Side: Illustration */}
                <div className="hidden md:flex md:w-1/2 justify-center items-center">
                    <img
                        src={loginImg}
                        alt="Illustration"
                        className="w-full h-auto"
                    />
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-2xl font-bold text-center mb-6">
                        Login
                    </h2>
                    <form  className="space-y-4">
                        {/* Email Input */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="input input-bordered bg-transparent backdrop-blur-lg w-full"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="input input-bordered bg-transparent backdrop-blur-lg w-full"
                            />
                        </div>
                        {/* Submit Button */}
                        <button className="btn btn-accent w-full mt-4">
                            Login
                        </button>
                    </form>

                    {/* Additional Options */}
                    <div className="text-center mt-4">
                        <p className="text-sm ">
                            New here?
                            <Link to="/register" className="font-bold ml-2">
                                Create a New Account
                            </Link>
                        </p>
                        <p className="text-sm mt-2">Or sign in with</p>
                        {/* <SocialLogin></SocialLogin> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
