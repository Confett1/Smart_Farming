import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import API from "../../../../../api/api";
// import { useEffect, useRef } from "react";
// import { toast } from "../../../../../utils/toast";
// import API from "../../../../../api/api";

const NitrogenMotor = ({darkModePref, nitrogenMotorStatus, motorStatusId}) => {
    const prevStatus = useRef(null);
    const startTime = useRef(null);

    if (typeof nitrogenMotorStatus === "string") {
        nitrogenMotorStatus = nitrogenMotorStatus.toLowerCase();
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
            console.log("Finished Nitrogen Application Record Added: ", response.data);
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
        if (prevStatus.current === "inactive" && nitrogenMotorStatus === "active") {
            startTime.current = Date.now();
            const record = {
                activityName: "🌱 Nitrogen Fertilizer Activated!",
                duration: "",
                status: "in progress",
                motorStatus: {motorStatusId},
            }
            const notification = {
                title: "🌱 Nitrogen Fertilization Started",
                messageBody: "Nitrogen fertilizer application has started.",
                type: "info",
                motorStatus: { motorStatusId } // Ensure this is correctly structured
            };         

            notifyAdmins(notification);
            addRecordActivation(record);
            console.log("Nitrogen motor activated!");
        }

        if( prevStatus.current === "active" && nitrogenMotorStatus === "inactive") {
            let duration = null;
            if (startTime.current) {
                duration = ((Date.now() - startTime.current) / (1000 * 60)).toFixed(1);
            }
            const record = {
                activityName: "✅ Nitrogen Fertilizer Application finished!",
                duration,
                status: "completed",
                motorStatus: {motorStatusId},
            }
            addRecordFinished(record);
            console.log("logging fertilizaion success");
            
        }
        prevStatus.current = nitrogenMotorStatus;
    }, [nitrogenMotorStatus])
    
    return (
        <>
            <div className={`status-card ${nitrogenMotorStatus === "inactive" ? "opacity-50" : "" } ${darkModePref ? "bg-gray-100" : "bg-gray-800 text-gray-300"}`}>
                <div className={`status-icon ${nitrogenMotorStatus}`}>
                    <i className="fas fa-seedling"></i>
                </div>
                <div className="status-info">
                    <h3>Nitrogen Pump</h3>
                    {/* <span className={`status ${status}`}>Inactive</span> */}
                    <Typography className={`status ${nitrogenMotorStatus}`} sx={{textTransform: "capitalize"}}>{nitrogenMotorStatus}</Typography>
                </div>
            </div>
        </>
    );
};


NitrogenMotor.propTypes = {
    darkModePref: PropTypes.bool.isRequired,
    nitrogenMotorStatus: PropTypes.any.isRequired,
    motorStatusId: PropTypes.number.isRequired,
}

export default NitrogenMotor;