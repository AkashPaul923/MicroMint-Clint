import { NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
    const {user, logout, loader} = useAuth()



    const handleLogout = () => {
        logout()
        .then(()=>{
            Swal.fire({
                // position: "top-end",
                icon: "success",
                title: "Successfully logout",
                showConfirmButton: false,
                timer: 1500
            });
        })

    }




    const links = (
        <>
            {
                user ?
                <>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                <li><button onClick={handleLogout}>Logout</button></li>
                </>
                :
                <>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
                </>
            }
            <li><a>Join as Developer</a></li>
        </>
    );


    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <NavLink to="/" className="btn btn-ghost text-xl">MicroMint</NavLink>
                </div>
                {/* <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{links}</ul>
                </div> */}
                <div className="navbar-end">
                    <div className=" hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">{links}</ul>
                    </div>
                    {user && <p className="btn mx-3">Coin 0</p>}
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-12 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={user? user?.photoURL : "https://img.icons8.com/?size=100&id=7819&format=png&color=000000"}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow lg:hidden"
                        >
                            {/* {user? <div>{user?.displayName}</div> :''} */}
                            {links}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

/**
 * <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            {links}
                        </ul>
                    </div>
 *  */
