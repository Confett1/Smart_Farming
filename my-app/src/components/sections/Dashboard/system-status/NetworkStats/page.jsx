const NetworkStatus = () => {
    return (
        <>
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
        </>
    );
};

export default NetworkStatus;