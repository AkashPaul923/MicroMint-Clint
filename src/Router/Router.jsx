import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "../Layout/BasicLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import Home from "../Pages/Basic/Home";
import Register from "../Pages/Basic/Register";
import Login from "../Pages/Basic/Login";

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
    },
])

export default router;