const ChartsContent = () => {
    return (
        <>
            <div className="summary-cards">
                <div className="card">
                    <div className="card-header">
                        <h3>Total Harvest</h3>
                        <span className="icon">📅</span>
                    </div>
                    <div className="card-content">
                        <div className="value">0 kg</div>
                        <p className="trend">0% from last period</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h3>Water Usage</h3>
                        <span className="icon">💧</span>
                    </div>
                    <div className="card-content">
                        <div className="value">0 L</div>
                        <p className="trend">0% from last period</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h3>Fertilizer Used</h3>
                        <span className="icon">🌱</span>
                    </div>
                    <div className="card-content">
                        <div className="value">0 L</div>
                        <p className="trend">0% from last period</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h3>Solar Energy</h3>
                        <span className="icon">⚡</span>
                    </div>
                    <div className="card-content">
                        <div className="value">0 kWh</div>
                        <p className="trend">0% from last period</p>
                    </div>
                </div>
            </div>

            <div className="tabs">
                <button className="tab-btn active" data-tab="harvest">Harvest</button>
                <button className="tab-btn" data-tab="water">Water Usage</button>
                <button className="tab-btn" data-tab="fertilizer">Fertilizer</button>
                <button className="tab-btn" data-tab="pestControl">Pest Control</button>
                <button className="tab-btn" data-tab="solar">Solar Energy</button>
            </div>

            <div className="tab-content">
                <div className="tab-pane active" id="harvest">
                    <div className="chart-card">
                        <h2>Rice Harvest Trends</h2>
                        <p>Monthly harvest amounts in kilograms</p>
                        <canvas id="harvestChart"></canvas>
                    </div>
                </div>
                <div className="tab-pane" id="water">
                    <div className="chart-card">
                        <h2>Water Usage and Irrigation Schedule</h2>
                        <p>Daily water consumption and irrigation timings</p>
                        <canvas id="waterChart"></canvas>
                    </div>
                </div>
                <div className="tab-pane" id="fertilizer">
                    <div className="chart-card">
                        <h2>Fertilizer Application</h2>
                        <p>Monthly fertilizer usage in liters</p>
                        <canvas id="fertilizerChart"></canvas>
                    </div>
                </div>
                <div className="tab-pane" id="pestControl">
                    <div className="chart-card">
                        <h2>Pest Control Measures</h2>
                        <p>Monthly pest control product application in liters</p>
                        <canvas id="pestControlChart"></canvas>
                    </div>
                </div>
                <div className="tab-pane" id="solar">
                    <div className="chart-card">
                        <h2>Solar Energy Consumption</h2>
                        <p>Daily solar energy usage in kilowatts</p>
                        <canvas id="solarChart"></canvas>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChartsContent;