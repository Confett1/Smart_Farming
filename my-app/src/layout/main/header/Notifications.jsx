import { useState, useEffect, useRef } from "react";
import { Typography } from "@mui/material";

const Notifications = () => {
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const notifDropdownRef = useRef(null);

    const toggleNotif = (e) => {
        e.stopPropagation();
        setIsNotifOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target)) {
                setIsNotifOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);
    return (
        <div ref={notifDropdownRef} className="mx-3">
            <button id="notificationBtn" aria-label="Notifications" onClick={toggleNotif}>
                <i className="fas fa-bell"></i>
                <span className="notification-count pulse">5</span>
            </button>
            {isNotifOpen && (
                <div className="notification-dropdown" style={{ display: 'block' }}>
                    <div className="text-left h-11 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                        <Typography sx={{ fontSize: 17, color: 'green' }}>Notification</Typography>
                        <div className="flex gap-1">
                            <button className="mark-all-read">
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
                        <div className="notification-item unread alert">
                            <div className="notification-icon">
                                <i className="fas fa-exclamation-circle"></i>
                            </div>
                            <div className="notification-content">
                                <div className="text-left text-sm font-bold">Critical Water Level</div>
                                <div className="text-left text-sm">Section A water level has dropped below 30%. Immediate irrigation required.</div>
                                <div className="text-right text-xs">5 minutes ago</div>
                            </div>
                            <div className="notification-actions">
                                <button className="action-btn view" title="View Details">
                                    <i className="fas fa-eye"></i>
                                </button>
                                <button className="action-btn dismiss" title="Dismiss">
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="notification-footer">
                        <a href="#" className="view-all text-xs">View All Notifications</a>
                        <span className="text-xs">5 unread notifications</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notifications;