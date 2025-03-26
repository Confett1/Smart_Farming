import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import Thermometer from "react-thermometer-component";
import API from "../../../../api/api";

const Temperature = ({ temperature, darkModePref, id }) => {
    const NOTIFICATION_COOLDOWN = 4 * 60 * 60 * 1000; // 4 hours
    const lastNotificationTime = useRef(Number(localStorage.getItem("lastTemperatureNotif")) || 0);

    const notifyAdmins = async (notificationData) => {
        try {
            const response = await API.post('/notifications', notificationData);
            console.log("Notification Sent:", response.data);
            lastNotificationTime.current = Date.now();
            localStorage.setItem('lastTemperatureNotif', lastNotificationTime.current);
        } catch (error) {
            console.error("❌ Failed to send notification:", error);
        }
    };

    useEffect(() => {
        console.log("📌 Current Temperature Value:", temperature);
        console.log(`📌 Last notification sent at: ${new Date(lastNotificationTime.current).toLocaleString()}`);
        console.log(id);
        

        if (temperature === 0 || temperature == null) return; // Skip if temp is 0 or null
        
        const now = Date.now();
        if (now - lastNotificationTime.current < NOTIFICATION_COOLDOWN) return; // Skip if cooldown is active
        
        let newNotification = null;

        if (temperature < 10) {
            newNotification = {
                title: "🥶 Cold Stress Warning!",
                messageBody: `Temperature dropped to ${temperature}°C. Pechay growth may slow down, and frost damage is possible! Take protective measures.`,
                type: "alert",
                npkReadings: {id},
            };
        } else if (temperature > 30) {
            newNotification = {
                title: "🔥 Heat Stress Alert!",
                messageBody: `Temperature reached ${temperature}°C. Pechay may start wilting or bolting. Provide shade and water adequately!`,
                type: "alert",
                npkReadings: { id },
            };
        }

        if (newNotification) notifyAdmins(newNotification);
    }, [temperature]); // ✅ Runs whenever `temperature` changes

    return (
        <div>
            <Thermometer
                theme={darkModePref ? "light" : "dark"}
                value={temperature}
                max="50"
                steps="1"
                format="°C"
                size="normal"
                height="180"
            />
            <h3 className="mt-4 font-bold">Temperature</h3>
        </div>
    );
};

Temperature.propTypes = {
    temperature: PropTypes.number.isRequired,
    darkModePref: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
};

export default Temperature;
