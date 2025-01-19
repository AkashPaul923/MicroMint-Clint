import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "../Layout/BasicLayout";
import DashboardLayout from "../Layout/DashboardLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <BasicLayout></BasicLayout>,
    },
    {
        path: "/dashboard",
        element: <DashboardLayout></DashboardLayout>,
    },
])

export default router;