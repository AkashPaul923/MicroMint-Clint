import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { IoMenu } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { PiCoinsFill } from "react-icons/pi";

const DashboardLayout = () => {
    const { user } = useAuth()
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content ">
                    {/* Page content here */}
                    
                    <div className="navbar bg-base-200">
                        <div className="navbar-start">
                            <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden">
                                <IoMenu />
                            </label>
                            <NavLink to="/" className="btn btn-ghost text-xl">
                                MicroMint
                            </NavLink>
                        </div>
                        <div className="navbar-end space-x-2"> 
                            <table className="text-center border-spacing-1">
                                <tr>
                                    <td><div className="btn btn-info btn-sm">Coin: 0</div></td>
                                    <td><img src={user?.photoURL} className="w-10 h-10 object-cover rounded-full mx-auto" /></td>
                                    <td className="rowspan-2"><IoMdNotifications className="text-3xl" /></td>
                                </tr>
                                <tr>
                                    <td><div className="badge badge-accent badge-outline">Role</div></td>
                                    <td><div className="badge badge-neutral">{user?.displayName}</div></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer-2"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        {/* Admin Route */}
                        <li><NavLink to="/dashboard/admin-home">Home</NavLink></li>
                        <li><NavLink to="/dashboard/manage-users">Manage Users</NavLink></li>
                        <li><NavLink to="/dashboard/manage-tasks">Manage Tasks</NavLink></li>

                        {/* Buyer Route */}
                        <li><a>Home</a></li>
                        <li><a>Add new Tasks</a></li>
                        <li><a>My Task’s</a></li>
                        <li><a>Purchase Coin</a></li>
                        <li><a>Payment history</a></li>

                        {/* Worker Route */}
                        <li><a>Home</a></li>
                        <li><a>TaskList</a></li>
                        <li><a>My Submissions</a></li>
                        <li><a>Withdrawals</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
