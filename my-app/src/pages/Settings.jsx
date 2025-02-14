import '../styles/Settings.css';
import Sidebar from '../components/Sidebar';

const Settings = () => {
    return (
        <>
        <div className="dashboard">
           
           <Sidebar />
        
            {/* Main Content Area */}
            <main className="content">
                {/* Header */}
                <header className="dashboard-header">
                    <h1 className="header-title">
                      <i className="fas fa-seedling"></i>
                      Smart Farming
                    </h1>
                    <div className="header-controls">
                      {/* Add Notification Bell*/}
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
                        {/* Add more notification items here */}
                      </div>
                      <div className="notification-footer">
                        <a href="#" className="view-all">View All Notifications</a>
                        <span className="notification-count-text">5 unread notifications</span>
                      </div>
                    </div>
                  </div>
                      <div className="search-bar">
                        <input type="search" placeholder="Search..." aria-label="Search"></input>
                        <button type="submit" aria-label="Submit search">
                          <i className="fas fa-search"></i>
                        </button>
                      </div>
                    </div>
                </header>
    
                <section className="settings-section">
                    <h2>Settings</h2>
                    <htmlForm className="settings-htmlForm">
                        <div className="setting-group">
                            <h3>General Settings</h3>
                            <div className="setting-item">
                                <label htmlFor="notifications">Enable Notifications</label>
                                <input type="checkbox" id="notifications" name="notifications" checked></input>
                            </div>
                            <div className="setting-item">
                                <label htmlFor="dark-mode">Dark Mode</label>
                                <input type="checkbox" id="dark-mode" name="dark-mode"></input>
                            </div>
                            <div className="setting-item">
                                <label htmlFor="language">Language</label>
                                <select id="language" name="language">
                                    <option value="en">English</option>
                                    <option value="es">Español</option>
                                    <option value="fr">Français</option>
                                    <option value="fr">Tagalog</option>
                                </select>
                            </div>
                        </div>
                        <div className="setting-group">
                            <h3>Farm Settings</h3>
                            <div className="setting-item">
                                <label htmlFor="units">Measurement Units</label>
                                <select id="units" name="units">
                                    <option value="metric">Metric (°C, mm)</option>
                                    <option value="imperial">Imperial (°F, in)</option>
                                </select>
                            </div>
                            <div className="setting-item">
                                <label htmlFor="data-sync">Data Sync Frequency</label>
                                <select id="data-sync" name="data-sync">
                                    <option value="5">Every 5 minutes</option>
                                    <option value="15">Every 15 minutes</option>
                                    <option value="30">Every 30 minutes</option>
                                    <option value="60">Every hour</option>
                                </select>
                            </div>
                            <div className="setting-item">
                                <label htmlFor="irrigation-threshold">Irrigation Threshold (%)</label>
                                <div className="range-container">
                                    <input type="range" id="irrigation-threshold" name="irrigation-threshold" min="0" max="100" value="30"></input>
                                    <output htmlFor="irrigation-threshold">30%</output>
                                </div>
                            </div>
                        </div>
                        <div className="setting-group">
                            <h3>Notification Settings</h3>
                            <div className="setting-item">
                                <label htmlFor="email">Email Notifications</label>
                                <input type="email" id="email" name="email" placeholder="Enter your email"></input>
                            </div>
                            <div className="setting-item">
                                <label htmlFor="sms">SMS Notifications</label>
                                <input type="tel" id="sms" name="sms" placeholder="Enter your phone number"></input>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Save Settings</button>
                    </htmlForm>
                </section>
            </main>
        </div>
        <script src="Settings.js"></script>    
        </>
    );
};

export default Settings;    