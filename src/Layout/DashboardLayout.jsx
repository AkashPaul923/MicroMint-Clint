import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { IoMenu } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import useUser from "../Hooks/useUser";
import logo from "../assets/image/logo.png";
import Theme from "../Components/Shared/Theme";

const DashboardLayout = () => {
    const [userRole, refetch, roleLoading] = useUser();
    const { user } = useAuth();
    return (
        <>
            <div className="navbar bg-base-200 fixed z-50">
                <div className="navbar-start">
                    <label
                        htmlFor="my-drawer-2"
                        className="btn drawer-button lg:hidden"
                    >
                        <IoMenu />
                    </label>
                    <NavLink
                        to="/"
                        className="btn btn-ghost md:text-2xl font-bold flex items-center"
                    >
                        <img className="w-8 md:w-12" src={logo} alt="" />
                        <h1 className="text-[#38b6ff]">MicroMint</h1>
                    </NavLink>
                </div>
                <div className="navbar-end space-x-2">
                    <Theme></Theme>
                    <table className="text-center border-spacing-1">
                        <tbody>
                            <tr>
                                <td>
                                    <div className="btn btn-info btn-sm">
                                        Coin: {userRole?.coin}
                                    </div>
                                </td>
                                <td>
                                    <img
                                        src={user?.photoURL}
                                        className="w-10 h-10 object-cover rounded-full mx-auto"
                                    />
                                </td>
                                <td className="rowspan-2">
                                    <IoMdNotifications className="text-3xl" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="badge badge-accent badge-outline">
                                        {userRole?.role}
                                    </div>
                                </td>
                                <td>
                                    <div className="badge badge-neutral">
                                        {user?.displayName}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <div className="drawer lg:drawer-open">
                    <input
                        id="my-drawer-2"
                        type="checkbox"
                        className="drawer-toggle"
                    />
                    <div className="drawer-content ">
                        {/* Page content here */}

                        <div className="min-h-screen pt-[100px]">
                            <Outlet></Outlet>
                        </div>
                        <div className="py-6 border-t border-neutral text-center bg-base-200">
                            <p className="">
                                &copy; {new Date().getFullYear()} MicroMint. All
                                rights reserved.
                            </p>
                        </div>
                    </div>
                    <div className="drawer-side">
                        <label
                            htmlFor="my-drawer-2"
                            aria-label="close sidebar"
                            className="drawer-overlay"
                        ></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-5 pt-[100px]">
                            {/* Sidebar content here */}

                            {/* Admin Route */}
                            {userRole?.role === "admin" && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/admin-home">
                                            Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/manage-users">
                                            Manage Users
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/manage-tasks">
                                            Manage Tasks
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {/* Buyer Route */}
                            {userRole?.role === "buyer" && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/buyer-home">
                                            Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/add-new-task">
                                            Add new Tasks
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/my-tasks">
                                            My Task’s
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/purchase-coin">
                                            Purchase Coin
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/payment-history">
                                            Payment history
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {/* Worker Route */}
                            {userRole?.role === "worker" && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/worker-home">
                                            Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/task-list">
                                            TaskList
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/my-submission">
                                            My Submissions
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/withdrawal">
                                            Withdrawals
                                        </NavLink>
                                    </li>
                                </>
                            )}
                            <li><NavLink to='/dashboard/profile'>My Profile</NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;
