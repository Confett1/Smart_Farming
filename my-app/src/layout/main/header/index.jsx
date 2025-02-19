
const Header = () => {
    return (
        <>
            <header className="dashboard-header">
                <h1 className="header-title">
                    <i className="fas fa-seedling"></i>
                    Smart Farming
                </h1>
                <div className="header-controls flex items-center gap-3">

                    <div className="notifications">
                        <button id="notificationBtn" aria-label="Notifications">
                            <i className="fas fa-bell"></i>
                            <span className="notification-count pulse">5</span>
                        </button>
                        <div className="notification-dropdown">
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
                    </div>
                    <div className="search-bar">
                        <input type="search" placeholder="Search..." aria-label="Search" />
                        <button type="submit" aria-label="Submit search">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;