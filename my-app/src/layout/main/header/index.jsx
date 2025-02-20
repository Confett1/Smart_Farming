import { useState, useEffect, useRef } from "react";
import Input from '@mui/joy/Input';

const Header = () => {
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
        <header className="dashboard-header">
            <h1 className="header-title">
                <i className="fas fa-seedling"></i>
                Smart Farming
            </h1>
            <div className="header-controls flex items-center gap-3">
                
                <Input
                    placeholder="Search..."
                    sx={{
                        '--Input-focusedInset': 'var(--any, 0)',
                        '--Input-focusedThickness': '0.25rem',
                        '--Input-focusedHighlight': 'rgba(13,110,253,.25)',
                        '& .MuiInput-underline:before': {
                            borderBottomColor: '#F5F5F5',
                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: '#ff5733',
                        },
                        '&:focus-within': {
                            borderColor: '#32CD32',
                            color: "#138808"
                        },
                        backgroundColor: "#F5F5F5",
                        borderRadius: 12,
                        fontSize: 14,
                        px: 2,
                        py: 1, 
                        width: 220
                    }}
                />
                <div className="notifications" ref={notifDropdownRef}>
                    <button id="notificationBtn" aria-label="Notifications" onClick={toggleNotif}>
                        <i className="fas fa-bell"></i>
                        <span className="notification-count pulse">5</span>
                    </button>
                    {isNotifOpen && (
                        <div className="notification-dropdown" style={{ display: 'block' }}>
                            <div className="notification-header">
                                <h3><i className="fas fa-bell"></i> Notifications</h3>
                                <div className="notification-actions">
                                    <button className="mark-all-read">
                                        <i className="fas fa-check-double"></i>
                                        Mark all as read
                                    </button>
                                    <button className="notification-settings">
                                        <i className="fas fa-cog"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="notification-filters">
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
                                        <div className="notification-title">Critical Water Level</div>
                                        <div className="notification-message">Section A water level has dropped below 30%. Immediate irrigation required.</div>
                                        <div className="notification-time">5 minutes ago</div>
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
                                <a href="#" className="view-all">View All Notifications</a>
                                <span className="notification-count-text">5 unread notifications</span>
                            </div>
                        </div>
                    )}
                </div>
                {/* <div className="search-bar">
                    <button type="submit" aria-label="Submit search">
                        <i className="fas fa-search"></i>
                    </button>
                </div> */}
            </div>
        </header>
    );
};

export default Header;
