const Irrigation = () => {
    return (
        <>
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
        </>
    );
};

export default Irrigation;