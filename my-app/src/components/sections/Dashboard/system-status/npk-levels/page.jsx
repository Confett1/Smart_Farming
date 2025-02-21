import { useEffect, useState } from "react";
import API from "../../../../../api/api";

const NpkLevels = () => {
    const [latestNPKReading, setLatestNPKReading] = useState({
        nitrogen: "--",
        phosphorus: "--",
        potassium: "--",
    })

    const fetchLatestReading = () => {
        API.get("/npk/latest")
        .then(response => setLatestNPKReading(response.data))
        .catch(error => console.error("Error fetching NPK data", error));
    }

    useEffect(() => {
        fetchLatestReading();

        const interval = setTimeout(fetchLatestReading, 10000)
        return () => clearInterval(interval);
    }, [])

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
                        <span>N: {latestNPKReading.nitrogen} P: {latestNPKReading.phosphorous} K: {latestNPKReading.potassium}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NpkLevels;