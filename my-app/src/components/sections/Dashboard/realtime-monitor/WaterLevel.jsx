const WaterLevel = () => {
    return (
        <>
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
        </>
    );
};

export default WaterLevel;