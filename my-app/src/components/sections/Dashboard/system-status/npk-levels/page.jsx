const NpkLevels = () => {
    return (
        <>
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
        </>
    );
};

export default NpkLevels;