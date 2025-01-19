import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navigation/Navbar";

const BasicLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="min-h-screen">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default BasicLayout;
