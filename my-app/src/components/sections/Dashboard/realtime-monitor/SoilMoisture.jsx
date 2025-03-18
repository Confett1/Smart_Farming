import { Divider } from "@mui/material";
import PropTypes from "prop-types";
// import GaugeChart from "react-gauge-chart";
import GaugeComponent from "react-gauge-component";
import API from "../../../../api/api";
import { useEffect, useRef} from "react";

const SoilMoisture = ({soilMoisture, darkModePref}) => {
    const moistureLevel = soilMoisture <= 25 ? "dry" : soilMoisture <=75 ? "moist" : "wet";
    const NOTIFICATION_COOLDOWN = 4 * 60 * 60 * 1000;
    const lastNotificationTime = useRef(localStorage.getItem("lastSoilMoistureNotif") || 0); // Persist last notification time
    const notifyAdmins = async (notificationData) => {
        try {
            const response = await API.post('/notifications', notificationData);
            console.log(response.data);
            lastNotificationTime.current = Date.now();
            localStorage.setItem('lastSoilMoistureNotif', lastNotificationTime.current);
        } catch (error) {
            console.error("Failed to send notification:", error);
        }
    };

    useEffect(() => {
        console.log(lastNotificationTime);
        let newNotification = null;

        if (soilMoisture <= 25) {
            newNotification = {
                title: "Soil Drought Alert!",
                messageBody: `Soil moisture dropped to ${soilMoisture}%. The soil is in drought conditions! Water it immediately.`,
                type: "alert" 
            };
        }

        if (newNotification) {
            const now = Date.now();
            if (now - lastNotificationTime.current >= NOTIFICATION_COOLDOWN) {
                notifyAdmins(newNotification);
                lastNotificationTime.current = now;
                localStorage.setItem('lastSoilMoistureNotif', now);
            }
        }
    }, [])

    return (
        <>
            <div className={`shadow-md ${darkModePref ? "bg-gray-100" : "bg-gray-700"} hover:shadow-lg transition-all items-center justify-center p-5 rounded-lg`}>
                <h3 className="font-bold mb-5 text-lg">Soil Moisture</h3>
                <Divider />
                <div className="flex justify-center items-center">
                    <div className="w-full mt-5">
                    <GaugeComponent
                        value={soilMoisture}
                        type="semicircle"
                        labels={{
                            tickLabels: {
                                type: "outer",
                                ticks: [
                                    { value: 25 },
                                    { value: 75 },
                                    { value: 50 },
                                ]
                            },
                            valueLabel: {
                                formatTextValue: (value) => `${value}%`,
                                style: {
                                    fill: soilMoisture <= 25 ? "red" : soilMoisture <= 75 ? "orange" : "blue",
                                    fontSize: "35px",
                                    fontWeight: "bold",
                                },
                            }
                        }}

                        arc={{
                            colorArray: ["red", "blue"],
                            padding: 0,
                            nbSubArcs: 300,
                            width: 0.2,
                        }}
                        pointer={{
                            type: "blob",
                            animationDelay: 0
                        }}
                    />
                </div>
                </div>
                <div className=" flex justify-around font-semibold w-full px-6">
                    <span className={`text-red-500 ${moistureLevel === "dry" ? "text-[25px] font-bold" : "text-md" }`}>Dry</span>
                    <span className={`text-orange-500 ${moistureLevel === "moist" ? "text-[25px] font-bold" : "text-md"}`}>Moist</span>
                    <span className={`text-blue-500 ${moistureLevel === "wet" ? "text-[25px] font-bold" : "text-md"}`}>Wet</span>
                </div>
            </div>
        </>
    );
};

SoilMoisture.propTypes = {
    soilMoisture: PropTypes.any.isRequired,
    darkModePref: PropTypes.bool.isRequired
}

export default SoilMoisture;