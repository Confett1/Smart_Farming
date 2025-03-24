import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import API from "../../../../../api/api";

const IrrigationMotor = ({darkModePref, irrigationMotorStatus, motorStatusId}) => {
    const prevStatus = useRef(null);
    const startTime = useRef(null);

    if (typeof irrigationMotorStatus === "string" ) {
        irrigationMotorStatus = irrigationMotorStatus.toLowerCase();
    }
    
    const notifyAdmins = async (notificationData) => {
        try {
            const response = await API.post('/notifications', notificationData);
            console.log(response.data);
        } catch (error) {
            console.error("Failed to send notification:", error);
        }
    };

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
            console.log("Finished Irrigation Record Added: ", response.data);
            
        } catch (error) {
            console.error("Error logging record: ", error);
            
        }
    }

    useEffect(() => {
        if (prevStatus.current === "inactive" && irrigationMotorStatus === "active") {
            startTime.current = Date.now();
            const record = {
                activityName: "💦 Water pump for Irrigation Activated!",
                duration: "",
                status: "in progress",
                motorStatus: {motorStatusId},
            }
            const notification = {
                title: "💦 Irrigation Started",
                messageBody: "The water pump for irrigation has been activated. Your crops are being watered!",
                type: "info",
                motorStatus: { motorStatusId },
            };
            notifyAdmins(notification);
            addRecordActivation(record);
            console.log("Irrigation motor activated!");
        }

        if( prevStatus.current === "active" && irrigationMotorStatus === "inactive") {
            let duration = null;
            
            if(startTime.current) {
                duration = ((Date.now() - startTime.current) / (1000 * 60)).toFixed(1);
            }
            const record = {
                activityName: "✅ Irrigation for the plants finished!",
                duration,
                status: "completed",
                motorStatus: {motorStatusId},
            }
            addRecordFinished(record);
            console.log("logging irrigation success");
            
        }
        prevStatus.current = irrigationMotorStatus;
    }, [irrigationMotorStatus])


    return (
        <>
            <div className={`status-card ${irrigationMotorStatus === "inactive" ? "opacity-50" : ""} ${darkModePref ? "bg-gray-100" : "bg-gray-800 text-gray-300"} `}>
                <div className={`status-icon ${irrigationMotorStatus}`}>
                    <i className="fas fa-faucet"></i>
                </div>
                <div className="status-info">
                    <h3>Irrigation Pump</h3>
                    {/* <span className={`status ${status}`}>Inactive</span> */}
                    <Typography className={`status ${irrigationMotorStatus}`} sx={{textTransform: "capitalize"}}>{irrigationMotorStatus}</Typography>
                </div>
            </div>
        </>
    );
};

IrrigationMotor.propTypes = {
    darkModePref: PropTypes.bool.isRequired,
    irrigationMotorStatus: PropTypes.any.isRequired,
    motorStatusId: PropTypes.number.isRequired,
}

export default IrrigationMotor;