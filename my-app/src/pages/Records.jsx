import '../styles/Records.css'
import '../script/Records.js'
import Sidebar from '../components/Sidebar'

const Records = () => {
    return (
        <>
        <div className="layout">
            <Sidebar />

            {/*<!-- Main Content -->*/}
            <div className="content">
                {/*<!-- Header -->*/}
                <header className="dashboard-header">
                    <h1 className="header-title">
                        <i className="fas fa-seedling"></i>
                        Smart Farming
                    </h1>
                    <div className="header-controls">
                        {/*<!-- Notification Bell -->*/}
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
                                    {/*<!-- Add more notification items here -->*/}
                                </div>
                                <div className="notification-footer">
                                    <a href="#" className="view-all">View All Notifications</a>
                                    <span className="notification-count-text">5 unread notifications</span>
                                </div>
                            </div>
                        </div>
                        {/*<!-- Search Bar -->*/}
                        <div className="search-bar">
                            <input type="search" placeholder="Search..." aria-label="Search"/>
                            <button type="submit" aria-label="Submit search">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </header>
    
                {/*<!-- Main Content Section -->*/}
                <main className="main-content">
                    <section className="records-section">
                        <div className="records-header">
                            <h2>Activity Records</h2>
                            <div className="records-actions">
                                <button className="btn btn-primary">
                                    <i className="fas fa-plus"></i> Add New Record
                                </button>
                                <div className="filter-dropdown">
                                    <button className="btn btn-secondary">
                                        <i className="fas fa-filter"></i> Filter By 
                                        <i className="fas fa-chevron-down"></i>
                                    </button>
                                    <div className="dropdown-content">
                                        <a href="#" className="active"><i className="fas fa-list"></i> All Records</a>
                                        <a href="#"><i className="fas fa-check-circle"></i> Completed</a>
                                        <a href="#"><i className="fas fa-clock"></i> In Progress</a>
                                        <a href="#"><i className="fas fa-calendar"></i> Scheduled</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-container">
                            <table className="records-table">
                                <thead>
                                    <tr>
                                        <th><i className="fas fa-calendar-alt"></i> Date</th>
                                        <th><i className="fas fa-tasks"></i> Activity</th>
                                        <th><i className="fas fa-info-circle"></i> Status</th>
                                        <th><i className="fas fa-clock"></i> Duration</th>
                                        <th><i className="fas fa-cog"></i> Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2024-11-28</td>
                                        <td>Irrigation</td>
                                        <td><span className="status-badge completed">Completed</span></td>
                                        <td>2 hours</td>
                                        <td>
                                            <button className="btn btn-icon" aria-label="Edit record">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2024-11-28</td>
                                        <td>Fertilization</td>
                                        <td><span className="status-badge in-progress">In Progress</span></td>
                                        <td>1 hour</td>
                                        <td>
                                            <button className="btn btn-icon" aria-label="Edit record">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2024-11-27</td>
                                        <td>Pest Control</td>
                                        <td><span className="status-badge completed">Completed</span></td>
                                        <td>3 hours</td>
                                        <td>
                                            <button className="btn btn-icon" aria-label="Edit record">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2024-11-27</td>
                                        <td>Harvesting</td>
                                        <td><span className="status-badge scheduled">Scheduled</span></td>
                                        <td>4 hours</td>
                                        <td>
                                            <button className="btn btn-icon" aria-label="Edit record">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="pagination">
                            <button className="btn btn-icon" title="Previous page">
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <div className="page-numbers">
                                <button className="page-num active">1</button>
                                <button className="page-num">2</button>
                                <button className="page-num">3</button>
                                <span className="page-ellipsis">...</span>
                                <button className="page-num">5</button>
                            </div>
                            <button className="btn btn-icon" title="Next page">
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </section>
                </main>
            </div>
        </div>
        <script src="Records.js"></script>
        </>
    );
}

export default Records;