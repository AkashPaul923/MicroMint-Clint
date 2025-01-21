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
import PrivateRoute from "../Auth/PrivateRoute";
import AdminRoute from "../Auth/AdminRoute";
import BuyerRoute from "../Auth/BuyerRoute";
import WorkerRoute from "../Auth/WorkerRoute";
import AddNewTask from "../Pages/Dashboard/Buyer/AddNewTask";

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
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:[
            // Admin
            {
                path: "/dashboard/admin-home",
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>,
            },
            {
                path: "/dashboard/manage-users",
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>,
            },
            {
                path: "/dashboard/manage-tasks",
                element: <AdminRoute><ManageTasks></ManageTasks></AdminRoute>,
            },
            // Buyer Route
            {
                path: "/dashboard/buyer-home",
                element: <BuyerRoute><BuyerHome></BuyerHome></BuyerRoute>,
            },
            {
                path: "/dashboard/add-new-task",
                element: <BuyerRoute><AddNewTask></AddNewTask></BuyerRoute>,
            },
            // Worker Route
            {
                path: "/dashboard/worker-home",
                element: <WorkerRoute><WorkerHome></WorkerHome></WorkerRoute>,
            },
        ]
    },
])

export default router;