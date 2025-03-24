import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import API from "../../../../../api/api";

const PhosporusMotor = ({darkModePref, phosphorusMotorStatus, motorStatusId}) => {
    const prevStatus = useRef(null);
    const startTime = useRef(null);

    if (typeof phosphorusMotorStatus === "string") {
        phosphorusMotorStatus = phosphorusMotorStatus.toLowerCase();
    }

    const addRecordActivation = async(recordDetails) => {
        try {
            const response = await API.post('/records/add', recordDetails);
            console.log("Activation Record Added: ", response.data);
        } catch (error) {
            console.log("Error message: ", error);
        }
    }

    const addRecordFinished = async(recordDetails) => {
        try {
            const response = await API.post('/records/add', recordDetails);
            console.log("Finished Phosphorus Application Record Added: ", response.data);
        } catch (error) {
            console.error("Error logging record: ", error);
            
        }
    }

    const notifyAdmins = async (notificationData) => {
        try {
            const response = await API.post('/notifications', notificationData);
            console.log(response.data);
        } catch (error) {
            console.error("Failed to send notification:", error);
        }
    };

    useEffect(() => {
        if (prevStatus.current === "inactive" && phosphorusMotorStatus === "active") {
            startTime.current = Date.now();
            const record = {
                activityName: "🌿 Phosphorus Fertilizer Activated!",
                duration: "",
                status: "in progress",
                motorStatus: {motorStatusId},
            }

            const notification = {
                title: "🌿 Phosphorus Fertilization Started",
                messageBody: "Phosphorus fertilizer application has started.",
                type: "info",
                motorStatus: {motorStatusId}
            };

            notifyAdmins(notification);
            addRecordActivation(record);
            console.log("Phosphorus motor activated!");
        }

        if( prevStatus.current === "active" && phosphorusMotorStatus === "inactive") {
            let duration = null;
            if(startTime.current) {
                duration = ((Date.now() - startTime.current) / (1000 * 60)).toFixed(1);
            }
            const record = {
                activityName: "✅ Phosphorus Fertilizer Application finished!",
                duration,
                status: "completed",
                motorStatus: {motorStatusId},
            }
            addRecordFinished(record);
            console.log("logging fertilization success");
            
        }
        prevStatus.current = phosphorusMotorStatus;
    }, [phosphorusMotorStatus])

    return (
        <>
            <div className={`status-card ${phosphorusMotorStatus === "inactive" ? "opacity-50" : ""} ${darkModePref ? "bg-gray-100 text-gray-700" : "bg-gray-800 text-gray-300"}`}>
                <div className={`status-icon ${phosphorusMotorStatus}`}>
                    <i className="fas fa-seedling"></i>
                </div>
                <div className="status-info">
                    <h3>Phosphorus Pump</h3>
                    {/* <span className={`status ${status}`}>{status}</span> */}
                    <Typography className={`status ${phosphorusMotorStatus}`} sx={{textTransform: "capitalize"}}>{phosphorusMotorStatus}</Typography>
                </div>
            </div>
        </>
    );
};


PhosporusMotor.propTypes = {
    darkModePref: PropTypes.bool.isRequired,
    phosphorusMotorStatus: PropTypes.any.isRequired,
    motorStatusId: PropTypes.any.isRequired,
}

export default PhosporusMotor;