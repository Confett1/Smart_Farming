import { useState, useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import API from "../../../api/api";
import PropTypes from "prop-types";
import { toastConfirm } from "../../../utils/toast";
import Swal from "sweetalert2";

//  CSS slideDown animation
const slideDownAnimation = `
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slideDown {
  animation: slideDown 0.3s ease forwards;
}
`;

const Notifications = ({ userProfile, darkModePref }) => {
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const notifDropdownRef = useRef(null);
    const [notifications, setNotifications] = useState([]);
    const [viewedNotificationId, setViewedNotificationId] = useState(null);
    const [filterType, setFilterType] = useState("all");

    const toggleViewMessage = (notificationId) => {
        setViewedNotificationId((prevId) => (prevId === notificationId ? null : notificationId));
    };

    const toggleNotif = (e) => {
        e.stopPropagation();
        setIsNotifOpen((prev) => !prev);
    };

    const deleteNotification = async (notificationId) => {
        const result = await toastConfirm("Are you sure you want to delete this notification?", "Confirm deletion", "warning", "Yes, Delete it.");
        if (result.isConfirmed) {
            try {
                await API.delete(`/notifications/${notificationId}`);
                setNotifications((prevNotifications) => prevNotifications.filter((n) => n.notificationId !== notificationId));

                Swal.fire({
                    title: "Deleted!",
                    text: "The notification has been deleted.",
                    icon: "success",
                });
            } catch (err) {
                console.error("Error deleting notification: ", err);

                Swal.fire({
                    title: "Error!",
                    text: "Failed to delete notification.",
                    icon: "error",
                });
            }
        }
    };

    const readNotification = async (notificationId) => {
        try {
            const response = await API.post(`/notifications/read/${notificationId}`);
            console.log(response.data);
            setNotifications((prevNotifications) =>
                prevNotifications.map((notif) =>
                    notif.notificationId === notificationId ? { ...notif, isRead: true } : notif
                )
            );
        } catch (err) {
            console.error("Error setting read: ", err);
        }
    };

    const markAllAsRead = async () => {
        try {
            await Promise.all(notifications.map((notification) => API.post(`/notifications/read/${notification.notificationId}`)));

            setNotifications((prevNotifications) =>
                prevNotifications.map((notif) => ({ ...notif, isRead: true }))
            );
        } catch (err) {
            console.error("Error marking all as read: ", err);
        }
    };

    const filterAlert = (type) => {
        setFilterType(type);
    };

    // Filter notifications based on selected type
    const filteredNotifications = filterType === "all" ? notifications : notifications.filter((notif) => notif.type === filterType);

    const getIcon = (type) => {
        switch (type) {
            case "alert":
                return "fas fa-exclamation-circle text-red-500";
            case "warning":
                return "fas fa-exclamation-triangle text-yellow-500";
            case "info":
                return "fas fa-info-circle text-blue-500";
            case "success":
                return "fas fa-check-circle text-green-500";
            default:
                return "fas fa-bell text-gray-500";
        }
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await API.get(`/user/notifications/${userProfile.userId}`);
                setNotifications(response.data || []);
            } catch (error) {
                console.error("Error retrieving notifications: ", error);
            }
        };

        fetchNotifications();

        const handleClickOutside = (event) => {
            if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target)) {
                setIsNotifOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        const interval = setInterval(() => {
            fetchNotifications();
        }, 10000);
        return () => {document.removeEventListener("click", handleClickOutside), clearInterval(interval)};
    }, [userProfile]);

    return (
        <div ref={notifDropdownRef} className="mx-3">
            {/* Add the animation CSS */}
            <style>{slideDownAnimation}</style>

            <button
                id="notificationBtn"
                aria-label="Notifications"
                onClick={toggleNotif}
                className="relative bg-transparent border-none text-gray-600 text-xl cursor-pointer transition-all duration-300 ease-in-out rounded-full p-2 hover:bg-gray-200 hover:text-gray-800"
            >
                <i className={`fas fa-bell ${darkModePref ? "text-gray-700" : "text-gray-200"}`}></i>
                {notifications.filter((notification) => !notification.isRead).length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                        {notifications.filter((notification) => !notification.isRead).length}
                    </span>
                )}
            </button>
            {isNotifOpen && (
                <div
                    className={`absolute top-[calc(100%+10px)] right-[111px] ${
                        darkModePref ? "bg-gray-100" : "bg-gray-700"
                    } w-[380px] rounded-lg shadow-lg z-50 animate-slideDown`}
                >
                    <div className={`text-left h-11 px-4 py-3 border-b ${
                        darkModePref ? "border-gray-300" : "border-gray-600"
                    } flex items-center justify-between`}
                    >
                        <Typography sx={{ fontSize: 17, color: darkModePref ? "green" : "lightgreen" }}>
                            Notification
                        </Typography>
                        <div className="flex gap-1">
                            <button
                                className={`transition-colors duration-300 ${
                                    !darkModePref ? "text-gray-300 hover:text-gray-100" : "text-gray-600 hover:text-gray-800"
                                }`}
                                onClick={markAllAsRead}
                            >
                                <i className={`${!darkModePref ? "text-gray-100" : "text-gray-800"} fas fa-check-double`}></i>
                                Mark all as read
                            </button>
                            <button
                                className={`transition-colors duration-300 ${
                                    !darkModePref ? "text-gray-300 hover:text-gray-100" : "text-gray-600 hover:text-gray-800"
                                }`}
                            >
                                <i className="fas fa-cog"></i>
                            </button>
                        </div>

                    </div>
                    <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 py-1 px-6">
    <button
        className={`px-3 py-1 rounded-full text-sm ${
            filterType === "all"
                ? darkModePref
                    ? "bg-blue-500 text-white" 
                    : " text-blue-500 bg-gray-600" 
                : `${darkModePref ? "bg-gray-200 text-gray-700" : "dark:bg-gray-600 dark:text-gray-100"}` 
        }`}
        onClick={() => filterAlert("all")}
    >
        All
    </button>
    <button
        className={`px-3 py-1 rounded-full text-sm ${
            filterType === "alert"
                ? darkModePref
                    ?"bg-red-500 text-white" 
                    : "text-red-500 bg-gray-600" 
                : ` ${darkModePref ? "bg-gray-200 text-gray-700" : "dark:bg-gray-600 dark:text-gray-100"}`
        }`}
        onClick={() => filterAlert("alert")}
    >
        Alerts
    </button>
    <button
        className={`px-3 py-1 rounded-full text-sm ${
            filterType === "warning"
                ? darkModePref
                    ? "bg-yellow-500 text-white" 
                    : "text-yellow-500 bg-gray-600"   
                : ` ${darkModePref ? "bg-gray-200 text-gray-700" : "dark:bg-gray-600 dark:text-gray-100"}`
        }`}
        onClick={() => filterAlert("warning")}
    >
        Warnings
    </button>
    <button
        className={`px-3 py-1 rounded-full text-sm ${
            filterType === "info"
                ? darkModePref
                    ?  "bg-blue-500 text-white" 
                    : " text-blue-500 bg-gray-600"  
                : ` ${darkModePref ? "bg-gray-200 text-gray-700" : "dark:bg-gray-600 dark:text-gray-100"}`
        }`}
        onClick={() => filterAlert("info")}
    >
        Info
    </button>
</div>
                    <div className={`max-h-[400px] overflow-y-auto ${
                        darkModePref ? "text-gray-600" : " text-gray-200"
                    }`}
                    >
                        {filteredNotifications.length > 0 ? (
                            filteredNotifications.map((notification) => (
                                <div
                                    key={notification.notificationId}
                                    className={`p-4 flex items-start gap-3 
                                        ${notification.isRead ? (darkModePref ? "bg-white" : "bg-gray-700") : (darkModePref ? "bg-blue-100" : "bg-gray-800")} 
                                        border-l-4 
                                        ${notification.isRead ? "border-transparent" : "border-blue-500"} 
                                        hover:${darkModePref ? "bg-gray-100" : "bg-gray-500"} 
                                        transition-colors duration-300`}
                                >

                                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200">
                                        <i className={`${getIcon(notification.type)}`}></i>
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-bold">{notification.title}</div>
                                        {viewedNotificationId === notification.notificationId && (
                                            <div className="text-sm">{notification.messageBody}</div>
                                        )}
                                        <div className="text-xs text-right">
                                            {new Date(notification.createdAt).toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                                        <button
                                            className="text-gray-600 hover:text-gray-800"
                                            onClick={() => {
                                                toggleViewMessage(notification.notificationId);
                                                readNotification(notification.notificationId);
                                            }}
                                        >
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <button
                                            className="text-gray-600 hover:text-gray-800"
                                            onClick={() => deleteNotification(notification.notificationId)}
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 py-3">No notifications</div>
                        )}
                    </div>
                    <div className="flex justify-between items-center p-4 border-t border-gray-200">
                        <Link to="/notifications" className="text-blue-500 hover:underline text-xs">
                            View All Notifications
                        </Link>
                        <span className={`text-xs ${darkModePref ? "text-gray-600" : "text-gray-200"}`}>
                            {notifications.filter((notification) => !notification.isRead).length} unread notifications
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

Notifications.propTypes = {
    userProfile: PropTypes.any.isRequired,
    darkModePref: PropTypes.bool.isRequired,
};

export default Notifications;