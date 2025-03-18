import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import Thermometer from "react-thermometer-component";
import API from "../../../../api/api";


const Temperature = ({temperature, darkModePref}) => {
    const NOTIFICATION_COOLDOWN = 4 * 60 * 60 * 1000;
    const lastNotificationTime = useRef(localStorage.getItem("lastTemperatureNotif") || 0); // Persist last notification time

    const notifyAdmins = async (notificationData) => {
        try {
            const response = await API.post('/notifications', notificationData);
            console.log(response.data);
            lastNotificationTime.current = Date.now();
            localStorage.setItem('lastTemperatureNotif', lastNotificationTime.current);
        } catch (error) {
            console.error("Failed to send notification:", error);
        }
    };

    useEffect(() => {
        console.log(lastNotificationTime);
        let newNotification = null;

        if (temperature !== 0 && temperature != null){
            if (temperature < 10) {
                newNotification = {
                    title: "Cold Stress Warning!",
                    messageBody: `Temperature dropped to ${temperature}°C. Pechay growth may slow down, and frost damage is possible! Take protective measures.`,
                    type: "alert"
                };
            } else if (temperature > 30) {
                newNotification = {
                    title: "Heat Stress Alert!",
                    messageBody: `Temperature reached ${temperature}°C. Pechay may start wilting or bolting. Provide shade and water adequately!`,
                    type: "alert"
                };
            }
        }          

        if (newNotification) {
            const now = Date.now();
            if (now - lastNotificationTime.current >= NOTIFICATION_COOLDOWN) {
                notifyAdmins(newNotification);
                lastNotificationTime.current = now;
                localStorage.setItem('lastTemperatureNotif', now);
            }
        }
    }, [])

    return (
        <>
            <div >
                <Thermometer
                    theme={`${darkModePref ? "light" : "dark"}`}
                    value={temperature}
                    max="50"
                    steps="1"
                    format="°C"
                    size="normal"
                    height="180"
                />
                <h3 className="mt-4 font-bold">Temperature</h3>
            </div>

        </>
    );
};

Temperature.propTypes = {
    temperature: PropTypes.any.isRequired,
    darkModePref: PropTypes.bool.isRequired
}

export default Temperature;