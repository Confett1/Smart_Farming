import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const RealTimeMonitor = () => {
    const npkChartRef = useRef(null);
    const solarChartRef = useRef(null);

    useEffect(() => {
        if (npkChartRef.current) {
            const npkChart = new Chart(npkChartRef.current, {
                type: 'line',
                data: {
                    labels: ['6:00', '9:00', '12:00', '15:00', '18:00'],
                    datasets: [
                        { label: 'Nitrogen', data: [45, 42, 47, 45, 43], borderColor: '#2196F3', fill: false },
                        { label: 'Phosphorus', data: [32, 31, 33, 32, 34], borderColor: '#4CAF50', fill: false },
                        { label: 'Potassium', data: [28, 29, 27, 28, 28], borderColor: '#FFA000', fill: false },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom' },
                    },
                    scales: {
                        y: { beginAtZero: true, max: 100 },
                    },
                },
            });

            return () => npkChart.destroy();
        }
    }, []);

    useEffect(() => {
        if (solarChartRef.current) {
            const solarChart = new Chart(solarChartRef.current, {
                type: 'line',
                data: {
                    labels: ['6:00', '9:00', '12:00', '15:00', '18:00'],
                    datasets: [
                        { label: 'Solar Power (kW)', data: [0.5, 1.2, 2.5, 1.8, 0.7], borderColor: '#FF9800', fill: false },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom' },
                    },
                    scales: {
                        y: { beginAtZero: true, max: 3 },
                    },
                },
            });

            return () => solarChart.destroy();
        }
    }, []);

    return (
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
                    <div className="npk-values">
                        <div className="value-box"><span>N</span><div id="n-value">45%</div></div>
                        <div className="value-box"><span>P</span><div id="p-value">32%</div></div>
                        <div className="value-box"><span>K</span><div id="k-value">28%</div></div>
                    </div>
                    <div className="card-body">
                        <canvas ref={npkChartRef}></canvas>
                    </div>
                </div>

                {/* Water Level Monitoring */}
                <div className="card field-water-card">
                    <div className="card-header"><h3>Water Level Monitoring</h3></div>
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
                    <div className="card-header"><h3>Solar Power Generation</h3></div>
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
                            <canvas ref={solarChartRef}></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RealTimeMonitor;
