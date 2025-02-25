// import { useEffect, useRef, useState } from 'react';
// import { Chart } from 'chart.js/auto';
// import { Typography } from '@mui/material';
// import API from '../../../../api/api';
// import NpkChart from './NpkChart';

// const RealTimeMonitor = () => {
//     const npkChartRef = useRef(null);
//     const npkChartInstance = useRef(null)
//     const solarChartRef = useRef(null);
//     const [fiveLatestReadings, setFiveLatestReadings] = useState([]);
//     const [latestNPKReading, setLatestNPKReading] = useState({
//         nitrogen: "--",
//         phosphorus: "--",
//         potassium: "--",
//     });

//     const fetchLatestReading = () => {
//         API.get("/npk/latest")
//         .then((response) => {
//             setLatestNPKReading(response.data);
//         })
//         .catch(error => console.error("Error fetching NPK data", error));
//     }

//     const fetchFiveLatestReadings = async () => {
//         try {
//             const response = await API.get("/npk/latest5");
//             setFiveLatestReadings(response.data);
//         } catch (error) {
//             console.error("Error fetching NPK readings", error);
            
//         }
//     }

//     useEffect(() => {
//         fetchLatestReading();
//         fetchFiveLatestReadings();

//         const interval = setInterval(fetchLatestReading, 10000);
//         return () => clearInterval(interval);
//     }, []);

//     useEffect(() => {
//         if (fiveLatestReadings.length > 0) {
//             updateChart(fiveLatestReadings);
//         }   
//     }, [fiveLatestReadings])

//     const updateChart = (readings) => {

//         if (!npkChartRef.current) return;

//         // Destroy previous chart instance if it exists
//         if (npkChartInstance.current) {
//             npkChartInstance.current.destroy();
//         }

//         const ctx = npkChartRef.current.getContext("2d");

//         const labels = readings.map(reading => 
//             new Date(reading.timestamp).toLocaleTimeString("en-US",{
//                 hour: "2-digit",
//                 minute: "2-digit",
//                 hour12: true,
//             })
//         );
//         const nitrogenData = readings.map(reading => reading.nitrogen);
//         const phosphorusData = readings.map(reading => reading.phosphorous);
//         const potassiumData = readings.map(reading => reading.potassium);

//         if (npkChartRef.current) {
//             npkChartInstance.current = new Chart(ctx, {
//                 type: 'line',
//                 data: {
//                     labels,
//                     datasets: [
//                         { label: 'Nitrogen', data: nitrogenData, borderColor: '#2196F3', fill: false },
//                         { label: 'Phosphorus', data: phosphorusData, borderColor: '#4CAF50', fill: false },
//                         { label: 'Potassium', data: potassiumData, borderColor: '#FFA000', fill: false },
//                     ],
//                 },
//                 options: {
//                     responsive: true,
//                     maintainAspectRatio: false,
//                     plugins: {
//                         legend: { position: 'bottom' },
//                     },
//                     scales: {
//                         y: { min: 80, max: 250 },
//                     },
//                 },
//             });
//         }
//     }

//     useEffect(() => {
//         if (solarChartRef.current) {
//             const solarChart = new Chart(solarChartRef.current, {
//                 type: 'line',
//                 data: {
//                     labels: ['6:00', '9:00', '12:00', '15:00', '18:00'],
//                     datasets: [
//                         { label: 'Solar Power (kW)', data: [0.5, 1.2, 2.5, 1.8, 0.7], borderColor: '#FF9800', fill: false },
//                     ],
//                 },
//                 options: {
//                     responsive: true,
//                     maintainAspectRatio: false,
//                     plugins: {
//                         legend: { position: 'bottom' },
//                     },
//                     scales: {
//                         y: { beginAtZero: true, max: 3 },
//                     },
//                 },
//             });

//             return () => solarChart.destroy();
//         }
//     }, []);

//     return (
//         <section className="monitoring">
//             <Typography
//                     sx={{
//                         textAlign: 'left',
//                         fontWeight: 600,
//                         mb: -1.5
//                     }}
//                 >
//                     Real-Time Monitoring
//                 </Typography>
//             <div className="monitoring-grid">
//                 {/* NPK Monitoring */}
//                 <div className="card">
//                     <div className="card-header">
//                         <h3>NPK Monitoring</h3>
//                         <button className="refresh-btn">
//                             <i className="fas fa-sync-alt"></i>
//                         </button>
//                     </div>
//                     <div className="npk-values">
//                         <div className="value-box"><span>N</span><div id="n-value">{latestNPKReading.nitrogen}</div></div>
//                         <div className="value-box"><span>P</span><div id="p-value">{latestNPKReading.phosphorous}</div></div>
//                         <div className="value-box"><span>K</span><div id="k-value">{latestNPKReading.potassium}</div></div>
//                     </div>
//                     <div className="card-body">
//                         <canvas ref={npkChartRef}></canvas>
//                     </div>
//                 </div>

//                 {/* Water Level Monitoring */}
//                 <div className="card field-water-card">
//                     <div className="card-header"><h3>Water Level Monitoring</h3></div>
//                     <div className="card-body">
//                         <div className="field-monitoring-grid">
//                             <div className="field-plot" data-water-level="85">
//                                 <div className="field-container">
//                                     <div className="field-visual">
//                                         <div className="water-overlay">
//                                             <div className="water-ripples"></div>
//                                         </div>
//                                         <div className="level-indicator">
//                                             <div className="level-marks">
//                                                 <span className="mark overflow">15cm</span>
//                                                 <span className="mark optimal">10cm</span>
//                                                 <span className="mark minimum">5cm</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="plot-info">
//                                         <div className="water-stats">
//                                             <span className="current-status optimal">Optimal Level</span>
//                                             <span className="water-depth">Water Depth: 12cm</span>
//                                         </div>
//                                         <div className="drainage-status">
//                                             <i className="fas fa-water"></i>
//                                             <span>Drainage Gate: Closed</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="field-overview">
//                             <div className="overview-stats">
//                                 <div className="stat-row">
//                                     <div className="stat-item">
//                                         <i className="fas fa-chart-line"></i>
//                                         <div className="stat-info">
//                                             <span className="stat-label">Average Water Level</span>
//                                             <div className="stat-value">10.5 cm</div>
//                                         </div>
//                                     </div>
//                                     <div className="stat-item">
//                                         <i className="fas fa-history"></i>
//                                         <div className="stat-info">
//                                             <span className="stat-label">Last Drainage</span>
//                                             <div className="stat-value">2h ago</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Solar Power */}
//                 <div className="card solar-monitor">
//                     <div className="card-header"><h3>Solar Power Generation</h3></div>
//                     <div className="card-body">
//                         <div className="power-stats">
//                             <div className="current-power">
//                                 <div className="power-circle">
//                                     <span className="power-value">0.0</span>
//                                     <span className="power-unit">kW</span>
//                                 </div>
//                                 <span className="power-label">Current Output</span>
//                             </div>
//                             <div className="power-details">
//                                 <div className="detail-item">
//                                     <span className="label">Battery Level</span>
//                                     <span className="value">0%</span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="power-graph">
//                             <canvas ref={solarChartRef}></canvas>
//                         </div>
//                     </div>
//                 </div>


//                 <NpkChart />
//             </div>
//         </section>
//     );
// };

// export default RealTimeMonitor;













import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import API from '../../../../api/api';
import NpkChart from './NpkChart';

const RealTimeMonitor = () => {
    const [fiveLatestReadings, setFiveLatestReadings] = useState([]);
    const [latestNPKReading, setLatestNPKReading] = useState({
        nitrogen: "--",
        phosphorous: "--",
        potassium: "--",
    });

    const fetchLatestReading = () => {
        API.get("/npk/latest")
        .then((response) => {
            setLatestNPKReading(response.data);
        })
        .catch(error => console.error("Error fetching NPK data", error));
    }

    const fetchFiveLatestReadings = async () => {
        try {
            const response = await API.get("/npk/latest5");
            setFiveLatestReadings(response.data);
        } catch (error) {
            console.error("Error fetching NPK readings", error);
        }
    }

    useEffect(() => {
        fetchLatestReading();
        fetchFiveLatestReadings();

        const interval = setInterval(fetchLatestReading, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="monitoring">
            <Typography sx={{ textAlign: 'left', fontWeight: 600, mb: -1.5 }}>Real-Time Monitoring</Typography>
            <div className="monitoring-grid">
                {/* NPK Monitoring */}
                <div className="card">
                    <div className="card-header">
                        <h3>NPK Monitoring</h3>
                    </div>
                    <div className="npk-values">
                        <div className="value-box"><span>N</span><div id="n-value">{latestNPKReading.nitrogen}</div></div>
                        <div className="value-box"><span>P</span><div id="p-value">{latestNPKReading.phosphorous}</div></div>
                        <div className="value-box"><span>K</span><div id="k-value">{latestNPKReading.potassium}</div></div>
                    </div>
                </div>

                {/* NPK Chart */}
                <NpkChart readings={fiveLatestReadings} />
            </div>
        </section>
    );
};

export default RealTimeMonitor;
