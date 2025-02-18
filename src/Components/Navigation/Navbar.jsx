import { NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useUser from "../../Hooks/useUser";
import logo from "../../assets/image/logo.png"
const Navbar = () => {
    const {user, logout, loader} = useAuth()
    const [userRole, refetch , roleLoading] = useUser()
    



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
                {!roleLoading && <li><NavLink to={`/dashboard/${userRole?.role}-home`}>Dashboard</NavLink></li>}
                <li><button onClick={handleLogout}>Logout</button></li>
                </>
                :
                <>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
                </>
            }
            <li><a href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-AkashPaul923" target="_blank">Join as Developer</a></li>
        </>
    );


    return (
        <nav className="fixed z-50 w-full">
            <div className="navbar bg-base-100 z-20">
                <div className="navbar-start">
                    <NavLink to="/" className="btn btn-ghost text-2xl font-bold flex items-center">
                        <img className="w-12" src={logo} alt="" />
                        <h1 className="text-[#38b6ff]">MicroMint</h1>
                    </NavLink>
                </div>
                {/* <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{links}</ul>
                </div> */}
                <div className="navbar-end">
                    <div className=" hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">{links}</ul>
                    </div>
                    {user && <p className="btn mx-3">Coin {userRole?.coin}</p>}
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
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow lg:hidden z-30"
                        >
                            {/* {user? <div>{user?.displayName}</div> :''} */}
                            {links}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
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
