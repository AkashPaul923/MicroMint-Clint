import { FaUser, FaCalendarAlt, FaDollarSign, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const TaskCard = ({ task }) => {
    const {
        _id,
        taskTitle,
        requiredWorker,
        payableAmount,
        buyerName,
        completionDate,
    } = task;

    return (
        <div className="card w-full bg-base-100 shadow-md border border-gray-200 rounded-lg">
            <div className="card-body">
                {/* Task Title */}
                <h2 className="card-title text-lg font-bold text-gray-800 flex items-center gap-2">
                    {taskTitle}
                </h2>

                {/* Buyer Name */}
                <p className="text-gray-700 text-sm flex items-center gap-2">
                    <FaUser className="text-green-500" />
                    {buyerName}
                </p>

                {/* Completion Date */}
                <p className="text-gray-700 text-sm flex items-center gap-2">
                    <FaCalendarAlt className="text-orange-500" />
                    {completionDate}
                </p>

                {/* Payable Amount */}
                <p className="text-gray-700 text-sm flex items-center gap-2">
                    <FaDollarSign className="text-yellow-500" />${payableAmount}
                </p>

                {/* Required Workers */}
                <p className="text-gray-700 text-sm flex items-center gap-2">
                    <FaUsers className="text-purple-500" />
                    {requiredWorker} Workers
                </p>

                {/* View Details Button */}
                <div className="card-actions justify-end">
                    <Link to={`/dashboard/task-detail/${_id}`} className="btn btn-accent btn-sm">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
