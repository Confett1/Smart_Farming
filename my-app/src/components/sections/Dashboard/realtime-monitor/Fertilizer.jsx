const Fertilizer = () => {
    return (
        <>
            <div className="card chart-card">
                <div className="card-header">
                    <h3>Fertilizer and Pesticide Levels</h3>
                </div>
                <div className="card-body">
                    <div className="idental-chart">
                        <div className="chart-item fertilizer-chart">
                            <span className="chart-label">Fertilizer Level</span>
                            <div className="chart-bar orange-bar" style={{ height: '70%' }}></div>
                            <span className="chart-value">70%</span>
                        </div>
                        <div className="chart-item pesticide-chart">
                            <span className="chart-label">Pesticide Level</span>
                            <div className="chart-bar green-bar" style={{ height: '50%' }}></div>
                            <span className="chart-value">50%</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Fertilizer;