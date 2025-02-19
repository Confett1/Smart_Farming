import '../styles/Homepage.css';
import Sidebar from '../components/Sidebar';

const Homepage = () => {
    return (
        <>
        <div className="layout">
      
          <Sidebar />
      
          
          <div className="content">
      
            <header className="dashboard-header">
              <h1 className="header-title">
                <i className="fas fa-seedling"></i>
                Smart Farming
              </h1>
              <div className="header-controls">
      
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
                  <input type="search" placeholder="Search..." aria-label="Search"/>
                  <button type="submit" aria-label="Submit search">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </header>
      
            
            <main className="main-content">
              
              <section className="status-overview">
                <h2 className="section-title">System Status</h2>
                <div className="status-grid">
                  <div className="status-card">
                    <div className="status-icon irrigation-status">
                      <i className="fas fa-tint"></i>
                    </div>
                    <div className="status-info">
                      <h3>Irrigation System</h3>
                      <span className="status active">Active</span>
                      <div className="status-details">
                        <span>Water Flow: 2.5 L/min</span>
                        <span>Next Schedule: 2h</span>
                      </div>
                    </div>
                  </div>
      
                  <div className="status-card">
                    <div className="status-icon solar-status">
                      <i className="fas fa-solar-panel"></i>
                    </div>
                    <div className="status-info">
                      <h3>Solar System</h3>
                      <span className="status active">Generating</span>
                      <div className="status-details">
                        <span>Current: 2.8 kW</span>
                        <span>Daily: 15.5 kWh</span>
                      </div>
                    </div>
                  </div>
      
                  <div className="status-card">
                    <div className="status-icon npk-status">
                      <i className="fas fa-flask"></i>
                    </div>
                    <div className="status-info">
                      <h3>NPK Levels</h3>
                      <span className="status warning">Check Required</span>
                      <div className="status-details">
                        <span>N: 45% P: 32% K: 28%</span>
                      </div>
                    </div>
                  </div>
      
                  <div className="status-card">
                    <div className="status-icon wifi-status">
                      <i className="fas fa-wifi"></i>
                    </div>
                    <div className="status-info">
                      <h3>Network Status</h3>
                      <span className="status active">Connected</span>
                      <div className="status-details">
                        <span>Signal: Strong</span>
                        <span>Devices: 8</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
      
              {/* Real-time Monitoring */}
              <section className="monitoring">
                <h2 className="section-title">Real-time Monitoring</h2>
                <div className="monitoring-grid">
                  {/* NPK Monitoring */}
                  <div className="card">
                    <div className="card-header">
                      <h3>NPK Monitoring</h3>
                      <button className="refresh-btn">
                        <i className="fas fa-sync-alt"></i>
                      </button>
                    </div>
                    {/*<!-- Simple Values Display -->*/}
                    <div className="npk-values">
                      <div className="value-box">
                          <span>N</span>
                          <div id="n-value">45%</div>
                      </div>
                      <div className="value-box">
                          <span>P</span>
                          <div id="p-value">32%</div>
                      </div>
                      <div className="value-box">
                          <span>K</span>
                          <div id="k-value">28%</div>
                      </div>
                  </div>
                    <div className="card-body">
                      <canvas id="npkChart"></canvas>
                    </div>
                  </div>
      
                  {/* <!-- Field Water Level Monitoring Card -->*/}
                  <div className="card field-water-card">
                    <div className="card-header">
                      <h3>Water Level Monitoring</h3>
                    </div>
                    <div className="card-body">
                      <div className="field-monitoring-grid">
                        <div className="field-plot" data-water-level="85">
                          <div className="field-container">
                            <div className="field-visual">
                              <div className="water-overlay">
                                <div className="water-ripples"></div>
                              </div>            
                              <div className="level-indicator">
                                <div className="level-marks">
                                  <span className="mark overflow">15cm</span>
                                  <span className="mark optimal">10cm</span>
                                  <span className="mark minimum">5cm</span>
                                </div>              
                              </div>
                            </div>
                            <div className="plot-info">            
                              <div className="water-stats">
                                <span className="current-status optimal">Optimal Level</span>
                                <span className="water-depth">Water Depth: 12cm</span>
                              </div>
                              <div className="drainage-status">
                                <i className="fas fa-water"></i>
                                <span>Drainage Gate: Closed</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="field-overview">
                        <div className="overview-stats">
                          <div className="stat-row">
                            <div className="stat-item">
                              <i className="fas fa-chart-line"></i>
                              <div className="stat-info">
                                <span className="stat-label">Average Water Level</span>
                                <div className="stat-value">10.5 cm</div>
                              </div>
                            </div>
                            <div className="stat-item">
                              <i className="fas fa-history"></i>
                              <div className="stat-info">
                                <span className="stat-label">Last Drainage</span>
                                <div className="stat-value">2h ago</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
      
                  {/* Solar Power */}
                  <div className="card solar-monitor">
                    <div className="card-header">
                      <h3>Solar Power Generation</h3>
                    </div>
                    <div className="card-body">
                      <div className="power-stats">
                        <div className="current-power">
                          <div className="power-circle">
                            <span className="power-value">0.0</span>
                            <span className="power-unit">kW</span>
                          </div>
                          <span className="power-label">Current Output</span>
                        </div>
                        <div className="power-details">
                          <div className="detail-item">
                            <span className="label">Battery Level</span>
                            <span className="value">0%</span>
                          </div>
                        </div>
                      </div>
                      <div className="power-graph">
                        <canvas id="solarChart"></canvas>
                      </div>
                    </div>
                  </div>
      
                  {/* <!-- Weather Forecast Card --> */}
                  <div className="card weather-card">
                    <div className="card-header">
                      <h3>Weather Forecast</h3>
                    </div>
                    <div className="card-body">
                      <div className="current-weather">
                        <div className="weather-primary">
                          <div className="weather-icon">
                            <i className="fas fa-sun"></i>
                          </div>
                          <div className="weather-info">
                            <div className="temperature">28°C</div>
                            <div className="condition">Sunny</div>
                          </div>
                        </div>
                        <div className="weather-details">
                          <div className="detail-item">
                            <i className="fas fa-tint"></i>
                            <span>Humidity: 75%</span>
                          </div>
                          <div className="detail-item">
                            <i className="fas fa-wind"></i>
                            <span>Wind: 5 km/h</span>
                          </div>
                          <div className="detail-item">
                            <i className="fas fa-cloud-rain"></i>
                            <span>Rain Chance: 20%</span>
                          </div>
                          <div className="detail-item">
                            <i className="fas fa-sun"></i>
                            <span>UV Index: 6</span>
                          </div>
                        </div>
                      </div>
                      <div className="forecast-grid">
                        <div className="forecast-day">
                          <span className="day">Monday</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
      
              {/* <!-- Control Center --> */}
              <section className="control-center">
                <h2 className="section-title">Control Center</h2>
                <div className="control-grid">
                  {/*<!-- Irrigation Control -->*/}
                  <div className="control-card">
                    <div className="card-header">
                      <h3><i className="fas fa-tint"></i> Irrigation</h3>
                      <span className="status active">Active</span>
                    </div>
                    <div className="control-body">
                      <div className="control-item">
                        <label>Water Flow Rate</label>
                        <input type="range" min="0" max="100" value="50" className="slider" id="waterFlow"/>
                        <span className="value">50%</span>
                      </div>
                      <div className="control-item">
                        <label>Schedule</label>
                        <select id="irrigationSchedule">
                          <option value="1">Every 1 hour</option>
                          <option value="2">Every 2 hours</option>
                          <option value="4">Every 4 hours</option>
                        </select>
                      </div>
                      <button className="control-btn" id="startIrrigation">
                        <i className="fas fa-play"></i> Start Irrigation
                      </button>
                    </div>
                  </div>
              
                  {/*<!-- Fertilizer Control -->*/}
                  <div className="control-card">
                    <div className="card-header">
                      <h3><i className="fas fa-flask"></i> Fertilizer</h3>
                      <span className="status warning">Low Supply</span>
                    </div>
                    <div className="control-body">
                      <div className="control-item">
                        <label>Fertilizer Mix</label>
                        <select id="fertilizerMix">
                          <option value="npk">NPK Mix</option>
                          <option value="nitrogen">Nitrogen Rich</option>
                          <option value="phosphorus">Phosphorus Rich</option>
                        </select>
                      </div>
                      <div className="control-item">
                        <label>Application Rate</label>
                        <input type="range" min="0" max="100" value="60" className="slider" id="fertilizerRate"/>
                        <span className="value">60%</span>
                      </div>
                      <button className="control-btn" id="startFertilizer">
                        <i className="fas fa-spray-can"></i> Apply Fertilizer
                      </button>
                    </div>
                  </div>
              
                  {/*<!-- Pest Control (New) -->*/}
                  <div className="control-card">
                    <div className="card-header">
                      <h3><i className="fas fa-bug"></i> Pest Control</h3>
                      <span className="status">Ready</span>
                    </div>
                    <div className="control-body">
                      <div className="control-item">
                        <label>Treatment Type</label>
                        <select id="pestControl">
                          <option value="organic">Organic Treatment</option>
                          <option value="chemical">Chemical Treatment</option>
                          <option value="biological">Biological Control</option>
                        </select>
                      </div>
                      <div className="control-item">
                        <label>Coverage Area</label>
                        <input type="range" min="0" max="100" value="75" className="slider" id="coverageArea"/>
                        <span className="value">75%</span>
                      </div>
                      <button className="control-btn" id="startPestControl">
                        <i className="fas fa-shield-alt"></i> Apply Treatment
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      
        <script src="Homepage.js"></script>      
        </>
    );
};

export default Homepage;