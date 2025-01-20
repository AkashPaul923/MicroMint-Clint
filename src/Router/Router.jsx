import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "../Layout/BasicLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import Home from "../Pages/Basic/Home";
import Register from "../Pages/Basic/Register";
import Login from "../Pages/Basic/Login";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import ManageTasks from "../Pages/Dashboard/Admin/ManageTasks";
import BuyerHome from "../Pages/Dashboard/Buyer/BuyerHome";
import WorkerHome from "../Pages/Dashboard/Worker/WorkerHome";

const router = createBrowserRouter([
    {
        path: "/",
        element: <BasicLayout></BasicLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardLayout></DashboardLayout>,
        children:[
            // Admin
            {
                path: "/dashboard/admin-home",
                element: <AdminHome></AdminHome>,
            },
            {
                path: "/dashboard/manage-users",
                element: <ManageUsers></ManageUsers>,
            },
            {
                path: "/dashboard/manage-tasks",
                element: <ManageTasks></ManageTasks>,
            },
            {
                path: "/dashboard/buyer-home",
                element: <BuyerHome></BuyerHome>,
            },
            {
                path: "/dashboard/worker-home",
                element: <WorkerHome></WorkerHome>,
            },
        ]
    },
])

export default router;