const SystemStatus = () => {
    return (
        <>
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
        </>
    );
}

export default SystemStatus;