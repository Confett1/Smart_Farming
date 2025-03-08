import { useEffect, useState } from "react";
import API from "../../../../../api/api";
import { capitalize, Typography } from "@mui/material";

const NpkLevels = () => {
    const [latestNPKReading, setLatestNPKReading] = useState({
        nitrogen: "--",
        phosphorous: "--",
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
                        <Typography sx={{textTransform: "capitalize"}} >
                            <Typography component="span" sx={{ fontWeight: "bold" }}>N</Typography>: {latestNPKReading.nitrogen} &nbsp;        
                            <Typography component="span" sx={{ fontWeight: "bold" }}>P</Typography>: {latestNPKReading.phosphorous} &nbsp;
                            <Typography component="span" sx={{ fontWeight: "bold" }}>K</Typography>: {latestNPKReading.potassium}
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NpkLevels;