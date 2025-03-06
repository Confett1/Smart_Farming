import { useState, useEffect, useRef} from "react";
import { Typography } from "@mui/material";
import {Link} from "react-router-dom"
import API from "../../../api/api";
import PropTypes from "prop-types";
import { toastConfirm } from "../../../utils/toast";

const Notifications = ( {userProfile} ) => {
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const notifDropdownRef = useRef(null);
    const [notifications, setNotifications] = useState([]);
    const [viewedNotificationId, setViewedNotificationId] = useState(null);

    const toggleViewMessage = (notificationId) => {
        setViewedNotificationId(prevId => (prevId === notificationId ? null : notificationId));
    };

 
    const toggleNotif = (e) => {
        e.stopPropagation();
        setIsNotifOpen((prev) => !prev);
    };

    const deleteNotification = async (notificationId) => {
        toastConfirm("Are you sure you want to delete this notification?", "Confirm deletion", "warning");
            try {
                await API.delete(`/notifications/${notificationId}`);
                setNotifications((prevNotifications) => prevNotifications.filter(n => n.notificationId !== notificationId));
            } catch (err) {
                console.error("Error deleting notification: ", err);
            }
    }

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
    }

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

    useEffect(() => {

        const fetchNotifications = async () => {
            try {
                const response = await API.get(`/user/notifications/${userProfile.userId}`);
                setNotifications(response.data || []);
            } catch (error) {
                console.error("Error retrieving notifications: ", error);
            }
        }
    
        fetchNotifications();

        const handleClickOutside = (event) => {
            if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target)) {
                setIsNotifOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [userProfile]);


    return (
        <div ref={notifDropdownRef} className="mx-3">
            <button id="notificationBtn" aria-label="Notifications" onClick={toggleNotif}>
                <i className="fas fa-bell"></i>
                <span className="notification-count pulse">{notifications.length}</span>
            </button>
            {isNotifOpen && (
                <div className="notification-dropdown" style={{ display: 'block' }}>
                    <div className="text-left h-11 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                        <Typography sx={{ fontSize: 17, color: 'green' }}>Notification</Typography>
                        <div className="flex gap-1">
                            <button className="mark-all-read" onClick={markAllAsRead}>
                                <i className="fas fa-check-double"></i>
                                Mark all as read
                            </button>
                            <button className="notification-settings">
                                <i className="fas fa-cog"></i>
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-2 border-b border-gray-200 py-1 px-6">
                        <button className="filter-btn active" data-filter="all">All</button>
                        <button className="filter-btn" data-filter="alert">Alerts</button>
                        <button className="filter-btn" data-filter="warning">Warnings</button>
                        <button className="filter-btn" data-filter="info">Info</button>
                    </div>
                    <div className="notification-list">
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <div key={notification.notificationId} className={`notification-item ${notification.isRead ? "read" : "unread"} alert`}>
                                    <div className="notification-icon">
                                        <i className="fas fa-exclamation-circle"></i>
                                    </div>
                                    <div className="notification-content">
                                        <div className="text-left text-sm font-bold">{notification.title}</div>
                                        {viewedNotificationId === notification.notificationId && (
                                            <div className="text-left text-sm">{notification.messageBody}</div>
                                        )}
                                        <div className="text-right text-xs">
                                            {new Date(notification.createdAt).toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="notification-actions">
                                        <button className="action-btn view" title="View Details" 
                                        onClick={() => {
                                            toggleViewMessage(notification.notificationId);
                                            readNotification(notification.notificationId);
                                            console.log(notification);
                                            }}>
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <button className="action-btn dismiss" title="Dismiss" onClick={() => deleteNotification(notification.notificationId)} >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 py-3">No notifications</div>
                        )}
                    </div>
                    <div className="notification-footer">
                        <Link to="/notifications" className="view-all text-xs">View All Notifications</Link>
                        <span className="text-xs">{notifications.filter(notification => !notification.isRead).length} unread notifications</span>
                    </div>
                </div>
            )}
        </div>
    );
};

Notifications.propTypes = {
    userProfile: PropTypes.any.isRequired,
};

export default Notifications;