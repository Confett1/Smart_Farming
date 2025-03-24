import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import API from "../../../../../api/api";

const IrrigationMotor = ({ darkModePref, irrigationMotorStatus, motorStatusId }) => {
    const prevStatus = useRef(null);
    const startTime = useRef(null);
    const [waterUsage, setWaterUsage] = useState(Number(localStorage.getItem("waterUsage")) || 0);
    const lastLoggedDate = useRef(null);

    if (typeof irrigationMotorStatus === "string") {
        irrigationMotorStatus = irrigationMotorStatus.toLowerCase();
    }

    const addRecordToChart = async () => {
        try {
            const now = Date.now();
            const response = await API.post('/charts', {
                timestamp: now,
                type: "water",
                value: waterUsage,
            });
            console.log("✅ Chart data posted! : ", response.data);
        } catch (error) {
            console.error("Error adding data to charts: ", error);
        }
    };

    const notifyAdmins = async (notificationData) => {
        try {
            const response = await API.post('/notifications', notificationData);
            console.log(response.data);
        } catch (error) {
            console.error("Failed to send notification:", error);
        }
    };

    const addRecordActivation = async (recordDetails) => {
        try {
            const response = await API.post('/records/add', recordDetails);
            console.log("Activation Record Added: ", response.data);
        } catch (error) {
            console.log("Error message: ", error);
        }
    };

    const addRecordFinished = async (recordDetails) => {
        try {
            const response = await API.post('/records/add', recordDetails);
            console.log("Finished Irrigation Record Added: ", response.data);
        } catch (error) {
            console.error("Error logging record: ", error);
        }
    };

    useEffect(() => {
        if (prevStatus.current === null) {
            prevStatus.current = irrigationMotorStatus;
            return;
        }

        if (prevStatus.current === "inactive" && irrigationMotorStatus === "active") {
            startTime.current = Date.now();
            const record = {
                activityName: "💦 Water pump for Irrigation Activated!",
                duration: "",
                status: "in progress",
                motorStatusId,
            };
            const notification = {
                title: "💦 Irrigation Started",
                messageBody: "The water pump for irrigation has been activated. Your crops are being watered!",
                type: "info",
                motorStatusId,
            };
            notifyAdmins(notification);
            addRecordActivation(record);
            console.log("Irrigation motor activated!");
        }

        if (prevStatus.current === "active" && irrigationMotorStatus === "inactive") {
            let duration = 0;
            if (startTime.current) {
                duration = parseFloat(((Date.now() - startTime.current) / (1000 * 60)).toFixed(1));
                setWaterUsage(prev => prev + 5 * duration);
                console.log("Water usage is at: ", waterUsage);
            }        

            const record = {
                activityName: "✅ Irrigation for the plants finished!",
                duration,
                status: "completed",
                motorStatusId,
            };
            addRecordFinished(record);
            console.log("Logging irrigation success");
        }
        
        prevStatus.current = irrigationMotorStatus;
        const now = new Date();
        const today = now.toISOString().split("T")[0];

        if (now.getHours() === 23 && now.getMinutes() === 59 && lastLoggedDate !== today) {
            addRecordToChart();
            localStorage.removeItem("waterUsage");
            lastLoggedDate.current = today;
        }
    }, [irrigationMotorStatus]);

    useEffect(() => {
        localStorage.setItem("waterUsage", JSON.stringify(waterUsage));
    }, [waterUsage]);

    useEffect(() => {
        const interval = setInterval(() => {
            
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`status-card ${irrigationMotorStatus === "inactive" ? "opacity-50" : ""} ${darkModePref ? "bg-gray-100" : "bg-gray-800 text-gray-300"} `}>
            <div className={`status-icon ${irrigationMotorStatus}`}>
                <i className="fas fa-faucet"></i>
            </div>
            <div className="status-info">
                <h3>Irrigation Pump</h3>
                <Typography className={`status ${irrigationMotorStatus}`} sx={{ textTransform: "capitalize" }}>
                    {irrigationMotorStatus}
                </Typography>
            </div>
        </div>
    );
};

IrrigationMotor.propTypes = {
    darkModePref: PropTypes.bool.isRequired,
    irrigationMotorStatus: PropTypes.any.isRequired,
    motorStatusId: PropTypes.number.isRequired,
};

export default IrrigationMotor;
