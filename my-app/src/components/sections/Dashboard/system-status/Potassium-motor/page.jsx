import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import API from "../../../../../api/api";

const PottasiumMotor = ({darkModePref, potassiumMotorStatus, motorStatusId}) => {
    const prevStatus = useRef(null);
    const startTime = useRef(null);

    if (typeof potassiumMotorStatus === "string") {
        potassiumMotorStatus = potassiumMotorStatus.toLowerCase();
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
        if (prevStatus.current === "inactive" && potassiumMotorStatus === "active") {
            startTime.current = Date.now();
            const record = {
                activityName: "☘️ Potassium Fertilizer Activated!",
                duration: "",
                status: "in progress",
                motorStatus: {motorStatusId},
            }

            const notification = {
                title: "☘️ Potassium Fertilization Started",
                messageBody: "Potassium fertilizer application has started.",
                type: "info",
                motorStatus: {motorStatusId},
            };            

            notifyAdmins(notification);
            addRecordActivation(record);
            console.log("Potassium motor activated!");
        }

        if( prevStatus.current === "active" && potassiumMotorStatus === "inactive") {
            let duration = null;

            if(startTime.current) {
                duration =((Date.now() - startTime.current) / (1000 * 60)).toFixed(1);
            }
            const record = {
                activityName: "✅ Potassium Fertilizer Application finished!",
                duration,
                status: "completed",
                motorStatus: {motorStatusId},
            }
            addRecordFinished(record);
            console.log("logging fertilization success");
            
        }
        prevStatus.current = potassiumMotorStatus;
    }, [potassiumMotorStatus])

    return (
        <>
            <div className={`status-card ${potassiumMotorStatus === "inactive" ? "opacity-50" : ""} ${darkModePref ? "bg-gray-100" : "bg-gray-800 text-gray-300"} `}>
                <div className={`status-icon ${potassiumMotorStatus}`}>
                    <i className="fas fa-seedling"></i>
                </div>
                <div className="status-info">
                    <h3>Potassium Pump</h3>
                    {/* <span className={`status ${status}`}>Inactive</span> */}
                    <Typography className={`status ${potassiumMotorStatus}`} sx={{textTransform: "capitalize"}}>{potassiumMotorStatus}</Typography>
                </div>
            </div>
        </>
    );
};

PottasiumMotor.propTypes = {
    darkModePref: PropTypes.bool.isRequired,
    potassiumMotorStatus: PropTypes.any.isRequired,
    motorStatusId: PropTypes.any.isRequired,
}

export default PottasiumMotor;