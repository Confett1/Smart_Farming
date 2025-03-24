import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import API from "../../../../api/api";

const WaterLevel = ({ darkModePref }) => {
    const [waterLevel, setWaterLevel] = useState({
        tankCapacity: 0,
        waterLevel: 0,
    });

    const NOTIFICATION_COOLDOWN = 4 * 60 * 60 * 1000; // 4 hours
    const lastNotificationTime = useRef(Number(localStorage.getItem("lastWaterLevelNotif")) || 0); // Persist last notification time

    const notifyAdmins = async (notificationData) => {
        try {
            const response = await API.post("/notifications", notificationData);
            console.log(response.data);
            lastNotificationTime.current = Date.now();
            localStorage.setItem("lastWaterLevelNotif", lastNotificationTime.current);
        } catch (error) {
            console.error("Failed to send notification:", error);
        }
    };

    const getFiftyPercent = (level) => level * 0.5;
    const getTwentyPercent = (level) => level * 0.2;

    const fetchWaterLevel = async () => {
        try {
            const response = await API.get("/waterLevel");
            setWaterLevel(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        console.log(`💧 Last Water Level Notification: ${new Date(lastNotificationTime.current).toLocaleString()}`);

        if (waterLevel.waterLevel === 0 || waterLevel.waterLevel == null) return;

        let newNotification = null;

        if (
            waterLevel.waterLevel <= getFiftyPercent(waterLevel.tankCapacity) &&
            waterLevel.waterLevel > getTwentyPercent(waterLevel.tankCapacity)
        ) {
            newNotification = {
                title: "⚠️ Water Level Dropping!",
                messageBody: `Water level is at ${waterLevel.waterLevel} cm. Consider refilling soon to avoid a shortage.`,
                type: "warning",
                WaterTank: { id: waterLevel.id }, // Ensure this ID exists
            };
        } else if (waterLevel.waterLevel <= getTwentyPercent(waterLevel.tankCapacity)) {
            newNotification = {
                title: "🚨 Critical Water Level Alert!",
                messageBody: `Water level is critically low at ${waterLevel.waterLevel} cm! Immediate action is required!`,
                type: "alert",
                WaterTank: { id: waterLevel.id },
            };
        }

        if (newNotification) {
            const now = Date.now();
            if (now - lastNotificationTime.current >= NOTIFICATION_COOLDOWN) {
                notifyAdmins(newNotification);
            }
        }
    }, [waterLevel]); // ✅ Added dependency

    useEffect(() => {
        fetchWaterLevel();
        const interval = setInterval(() => {
            fetchWaterLevel(); // ✅ Fixed missing function call
        }, 10000); // ✅ Increased interval to 10 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`card field-water-card ${darkModePref ? "text-gray-800 bg-gray-100 " : "bg-gray-700 text-gray-300"}`}>
            <div className="card-header">
                <h3>Water Level Monitoring</h3>
            </div>
            <div className="card-body">
                <div className="field-monitoring-grid">
                    <div className={`field-plot ${darkModePref ? "bg-gray-100" : "bg-gray-800"}`}>
                        <div className="field-container">
                            <div className={`field-visual ${darkModePref ? "bg-gray-100" : "bg-gray-700"}`}>
                                <div
                                    className="water-overlay"
                                    style={{
                                        height: `${(waterLevel?.waterLevel / waterLevel.tankCapacity) * 100}%`,
                                        transition: "height 1s ease-in-out",
                                        background: darkModePref
                                            ? "linear-gradient(180deg, rgba(33, 150, 243, 0.4), rgba(33, 150, 243, 0.6))"
                                            : "linear-gradient(180deg, rgba(13, 71, 161, 0.6), rgba(2, 36, 82, 0.8))",
                                    }} // Dynamic height
                                >
                                    <div className="water-ripples"></div>
                                </div>
                                <div className="level-indicator">
                                    <div className={`level-marks ${darkModePref ? "text-gray-700" : "text-gray-300"}`}>
                                        <span className={`mark ${darkModePref ? "bg-gray-100" : "bg-gray-700"}`}>
                                            {waterLevel.tankCapacity} cm
                                        </span>
                                        <span className={`mark ${darkModePref ? "bg-gray-100" : "bg-gray-700"}`}>
                                            {getFiftyPercent(waterLevel.tankCapacity)} cm
                                        </span>
                                        <span className={`mark ${darkModePref ? "bg-gray-100" : "bg-gray-700"}`}>
                                            {getTwentyPercent(waterLevel.tankCapacity)} cm
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="plot-info">
                                <div className="water-stats">
                                    <span
                                        className={`current-status ${
                                            (waterLevel?.waterLevel || 0) >= 10
                                                ? "text-green-100 bg-green-600"
                                                : "text-red-100 bg-red-600"
                                        }`}
                                    >
                                        {(waterLevel?.waterLevel || 0) >= 10 ? "Optimal Level" : "Low Level"}
                                    </span>
                                    <span className="water-depth">
                                        Water Depth: {waterLevel?.waterLevel || 0}cm
                                    </span>
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
};

export default WaterLevel;
