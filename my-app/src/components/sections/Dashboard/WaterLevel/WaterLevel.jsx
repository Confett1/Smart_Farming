const WaterLevel = () => {
    return (
        <>
            <div className="container">
                <div className="water-grid water-grid-2">
                    {/* <!-- Water Tank --> */}
                    <div className="level-card">
                        <div className="level-card-header">
                        <div className="level-card-title">Water Tank</div>
                        </div>
                        <div className="level-card-content">
                        <div className="tank-container">
                            <div className="tank-fill" id="tank-fill"></div>
                            <div className="tank-value" id="tank-value">78%</div>
                            <div className="tank-markers">
                            <div className="tank-marker">
                                <div className="tank-marker-label">100%</div>
                            </div>
                            <div className="tank-marker">
                                <div className="tank-marker-label">75%</div>
                            </div>
                            <div className="tank-marker">
                                <div className="tank-marker-label">50%</div>
                            </div>
                            <div className="tank-marker">
                                <div className="tank-marker-label">25%</div>
                            </div>
                            <div className="tank-marker">
                                <div className="tank-marker-label">0%</div>
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