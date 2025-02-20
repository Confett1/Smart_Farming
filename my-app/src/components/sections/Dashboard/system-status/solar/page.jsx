const NpkLevels = () => {
    return (
        <>
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
        </>
    );
};

export default NpkLevels;