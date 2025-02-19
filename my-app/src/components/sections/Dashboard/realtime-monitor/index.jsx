const RealTimeMonitor = () => {
    return (
        <>
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
        </>
    );
};

export default RealTimeMonitor;