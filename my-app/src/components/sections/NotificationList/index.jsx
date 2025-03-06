import { useEffect, useState } from "react";
import API from "../../../api/api";
import PropTypes from "prop-types";
import LinearLoader from "../../loader/LinearLoader";

const Notifications = ({profile}) => {
    const [notifications, setNotification] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            if(!profile?.userId) return;
            try {
                const response = await API.get(`user/notifications/${profile.userId}`);
                setIsLoading(false);
                setNotification(response.data);
            } catch (err) {
                console.error("Error fetching notifications: ", err);
                setError("Failed to load notifications.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchNotifications();

    }, [profile?.userId])

    const getIcon = (type) => {
        switch (type) {
            case "alert": return "exclamation-circle text-red-500";
            case "warning": return "exclamation-triangle text-yellow-500";
            case "info": return "info-circle text-blue-500";
            case "success": return "check-circle text-green-500";
            default: return "bell text-gray-500";
        }
    };

    const getColor = (type) => {
        switch (type) {
            case "alert": return "text-red-500";
            case "warning": return "text-yellow-500";
            case "info": return "text-blue-500";
            case "success": return "text-green-500";
            default: return "text-gray-500";
        }
    }

    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const past = new Date(timestamp);
        const diffInSeconds = Math.floor((now - past) / 1000);

        const timeIntervals = [
            { label: "year", seconds: 31536000 },
            { label: "month", seconds: 2592000 },
            { label: "week", seconds: 604800 },
            { label: "day", seconds: 86400 },
            { label: "hour", seconds: 3600 },
            { label: "minute", seconds: 60 },
            { label: "second", seconds: 1 },
        ];

        for (const interval of timeIntervals) {
            const count = Math.floor(diffInSeconds / interval.seconds);
            if (count >= 1) {
                return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
            }
        }
        return "just now";
    };


    // const notifications = [
    //     {
    //         id: 1,
    //         icon: 'bell',
    //         title: 'New message from John',
    //         description: 'You received a new message from John.',
    //         time: '2 minutes ago',
    //         color: 'text-blue-500',
    //     },
    //     {
    //         id: 2,
    //         icon: 'check-circle',
    //         title: 'Task Completed',
    //         description: 'Your task "Finish the project" has been completed.',
    //         time: '10 minutes ago',
    //         color: 'text-green-500',
    //     },
    //     {
    //         id: 3,
    //         icon: 'exclamation-circle',
    //         title: 'Warning: Server Down',
    //         description: 'The server is down. Please take action immediately.',
    //         time: '30 minutes ago',
    //         color: 'text-yellow-500',
    //     },
    //     {
    //         id: 4,
    //         icon: 'times-circle',
    //         title: 'Action Required',
    //         description: 'Your subscription has expired. Please renew it.',
    //         time: '1 hour ago',
    //         color: 'text-red-500',
    //     },
    //     {
    //         id: 5,
    //         icon: 'info-circle',
    //         title: 'System Update Available',
    //         description: 'A new system update is available. Please update your system.',
    //         time: '2 hours ago',
    //         color: 'text-blue-500',
    //     },
    // ];

    return (
        <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-xl font-semibold mb-6">All Notifications</h1>
            { isLoading ? (
                <LinearLoader />
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : notifications.length === 0 ? (
                <p className="text-gray-500">No notifications available.</p>
            ) : (
            <ul>
                {notifications.map((notification) => (
                    <li
                        key={notification.notificationId}
                        className="flex items-center p-2 border-b border-gray-200 hover:bg-gray-50"
                    >
                        <div className="flex-shrink-0">
                            <span className={`notification-icon ${getColor(notification.type)}`}>
                                <i className={`fas fa-${getIcon(notification.type)}`}></i>
                            </span>
                        </div>
                        <div className="ml-4">
                            <p className="text-gray-800 font-semibold">{notification.title}</p>
                            <p className="text-gray-600">{notification.messageBody}</p>
                            <span className="text-xs text-gray-500">{getTimeAgo(notification.createdAt)}</span>
                        </div>
                    </li>
                ))}
            </ul>
            )}
        </div>
    );
};

Notifications.propTypes = {
    profile: PropTypes.any.isRequired
}

export default Notifications;
