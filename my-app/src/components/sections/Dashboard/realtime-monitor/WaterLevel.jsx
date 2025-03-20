import PropTypes from "prop-types";
import { useEffect, useState } from "react";

    const WaterLevel = ({darkModePref}) => {
        const [waterLevel, setWaterLevel] = useState(10);

            useEffect(() => {
                const interval = setInterval(() => {
                    const randomLevel = Math.floor(Math.random() * 16);
                    setWaterLevel(randomLevel);
                }, 5000)

                return (() => clearInterval(interval));
            }, [])

            return (
                <div className={`card field-water-card ${darkModePref ? "text-gray-800 bg-gray-100 " : "bg-gray-700 text-gray-300"}`}>
                    <div className={`card-header`}>
                        <h3>Water Level Monitoring</h3>
                    </div>
                    <div className="card-body">
                        <div className="field-monitoring-grid">
                            <div className={`field-plot ${darkModePref ? "bg-gray-100" : "bg-gray-800"}`}>
                                <div className="field-container ">
                                    <div className={`field-visual ${darkModePref ? "bg-gray-100" : "bg-gray-700"}`}>
                                        <div 
                                            className="water-overlay"
                                            style={{ height: `${(waterLevel / 15) * 100}%`, transition: "height 1s ease-in-out", 
                                            background: darkModePref ? "linear-gradient(180deg, rgba(33, 150, 243, 0.4), rgba(33, 150, 243, 0.6))" : "linear-gradient(180deg, rgba(13, 71, 161, 0.6), rgba(2, 36, 82, 0.8))", }} // Dynamic height
                                        >
                                            <div className="water-ripples"></div>
                                        </div>
                                        <div className="level-indicator">
                                            <div className={`level-marks ${darkModePref ? "text-gray-700" : "text-gray-300"}`}>
                                                <span className={` mark ${darkModePref ? "bg-gray-100" : "bg-gray-700"}`}>15cm</span>
                                                <span className={` mark ${darkModePref ? "bg-gray-100" : "bg-gray-700"}`}>10cm</span>
                                                <span className={` mark ${darkModePref ? "bg-gray-100" : "bg-gray-700"}`}>5cm</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="plot-info">
                                        <div className="water-stats">
                                            <span
                                                className={`current-status  ${
                                                    waterLevel >= 10 
                                                    ? "text-green-100 bg-green-600"
                                                    : "text-red-100 bg-red-600"
                                                }`}
                                                >
                                                {waterLevel >= 10 ? "Optimal Level" : "Low Level"}
                                            </span>
                                            <span className="water-depth">Water Depth: {waterLevel}cm</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        
    };

    WaterLevel.propTypes = {
        darkModePref: PropTypes.bool.isRequired,
    }

    export default WaterLevel;