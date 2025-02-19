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
import MyTasks from "../Pages/Dashboard/Buyer/MyTasks";
import UpdateTask from "../Pages/Dashboard/Buyer/UpdateTask";
import TaskList from "../Pages/Dashboard/Worker/TaskList";
import TaskDetail from "../Pages/Dashboard/Worker/TaskDetail";
import MySubmission from "../Pages/Dashboard/Worker/MySubmission";
import Withdrawal from "../Pages/Dashboard/Worker/Withdrawal";
import PurchaseCoin from "../Pages/Dashboard/Buyer/PurchaseCoin";
import Payment from "../Pages/Dashboard/Buyer/Payment";
import PaymentHistory from "../Pages/Dashboard/Buyer/PaymentHistory";
import AboutUs from "../Pages/Basic/AboutUs";
import ContactUs from "../Pages/Basic/ContactUs";
import Profile from "../Pages/Basic/Profile";

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
                path: '/about-us',
                element: <AboutUs></AboutUs>
            },
            {
                path: '/contact-us',
                element: <ContactUs></ContactUs>
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
            {
                path: "/dashboard/profile",
                element: <Profile></Profile>,
            },
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
            {
                path: "/dashboard/my-tasks",
                element: <BuyerRoute><MyTasks></MyTasks></BuyerRoute>,
            },
            {
                path: "/dashboard/update-tasks/:id",
                element: <BuyerRoute><UpdateTask></UpdateTask></BuyerRoute>
            },
            {
                path: "/dashboard/purchase-coin",
                element: <BuyerRoute><PurchaseCoin></PurchaseCoin></BuyerRoute>,
            },
            {
                path: "/dashboard/payment",
                element: <BuyerRoute><Payment></Payment></BuyerRoute>,
            },
            {
                path: "/dashboard/payment-history",
                element: <BuyerRoute><PaymentHistory></PaymentHistory></BuyerRoute>,
            },
            // Worker Route
            {
                path: "/dashboard/worker-home",
                element: <WorkerRoute><WorkerHome></WorkerHome></WorkerRoute>,
            },
            {
                path: "/dashboard/task-list",
                element: <WorkerRoute><TaskList></TaskList></WorkerRoute>,
            },
            {
                path: "/dashboard/task-detail/:id",
                element: <WorkerRoute><TaskDetail></TaskDetail></WorkerRoute>
            },
            {
                path: "/dashboard/my-submission",
                element: <WorkerRoute><MySubmission></MySubmission></WorkerRoute>,
            },
            {
                path: "/dashboard/withdrawal",
                element: <WorkerRoute><Withdrawal></Withdrawal></WorkerRoute>,
            },
        ]
    },
])

export default router;