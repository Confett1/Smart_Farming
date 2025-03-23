import { useEffect, useRef } from "react";
import API from "../../../../api/api";
import "../../../../styles/NutrientTable.css";
import PropTypes from "prop-types";

const NPKLatest = ({ darkModePref, nitrogen, phosphorus, potassium, id }) => {
    const NOTIFICATION_COOLDOWN = 4 * 60 * 60 * 1000; // 4 hours

    // Store last notification timestamps for each nutrient
    const lastNitrogenNotif = useRef(Number(localStorage.getItem("lastNitroNotif")) || 0);
    const lastPhosphorusNotif = useRef(Number(localStorage.getItem("lastPhosNotif")) || 0);
    const lastPotassiumNotif = useRef(Number(localStorage.getItem("lastPotaNotif")) || 0);

    const notifyAdmins = async (notificationData, nutrientType) => {
        try {
            const response = await API.post('/notifications', notificationData);
            console.log(`Notification Sent (${nutrientType}):`, response.data);

            // Update last notification timestamp
            const now = Date.now();
            if (nutrientType === "Nitrogen") {
                lastNitrogenNotif.current = now;
                localStorage.setItem("lastNitroNotif", now);
            } else if (nutrientType === "Phosphorus") {
                lastPhosphorusNotif.current = now;
                localStorage.setItem("lastPhosNotif", now);
            } else if (nutrientType === "Potassium") {
                lastPotassiumNotif.current = now;
                localStorage.setItem("lastPotaNotif", now);
            }
        } catch (error) {
            console.error(`❌ Failed to send ${nutrientType} notification:`, error);
        }
    };

    useEffect(() => {
        console.log("🍃 Current Nutrient Values:", { nitrogen, phosphorus, potassium });
        console.log(`🍃 Last Nitrogen notification: ${new Date(lastNitrogenNotif.current).toLocaleString()}`);
        console.log(`🍃 Last Phosphorus notification: ${new Date(lastPhosphorusNotif.current).toLocaleString()}`);
        console.log(`🍃 Last Potassium notification: ${new Date(lastPotassiumNotif.current).toLocaleString()}`);

        if (!id) return; // Prevent errors if id is missing

        const now = Date.now();


        // Nitrogen Notifications
        if (nitrogen && now - lastNitrogenNotif.current >= NOTIFICATION_COOLDOWN) {
            let nitrogenNotification = null;
            if (nitrogen <= 100 && nitrogen > 40) {
                nitrogenNotification = {
                    title: "⚠️ Low Nitrogen Levels!",
                    messageBody: `Nitrogen levels have dropped to ${nitrogen}. Consider fertilizing soon to maintain healthy soil.`,
                    type: "warning",
                    npkReadings: { id },
                };
            } else if (nitrogen <= 80) {
                nitrogenNotification = {
                    title: "🚨 Critical Nitrogen Deficiency!",
                    messageBody: `Nitrogen has fallen to ${nitrogen}, which may severely impact plant growth. Immediate fertilization is needed!`,
                    type: "alert",
                    npkReadings: { id },
                };
            }
            if (nitrogenNotification) notifyAdmins(nitrogenNotification, "Nitrogen");
        }

        // Phosphorus Notifications
        if (phosphorus && now - lastPhosphorusNotif.current >= NOTIFICATION_COOLDOWN) {
            let phosphorusNotification = null;
            if (phosphorus <= 70 && phosphorus > 40) {
                phosphorusNotification = {
                    title: "⚠️ Low Phosphorus Levels!",
                    messageBody: `Phosphorus levels have dropped to ${phosphorus}. This may affect root and flower development. Consider applying phosphorus-rich fertilizer.`,
                    type: "warning",
                    npkReadings: { id },
                };
            } else if (phosphorus <= 40) {
                phosphorusNotification = {
                    title: "🚨 Severe Phosphorus Deficiency!",
                    messageBody: `Phosphorus has fallen to ${phosphorus}, which can weaken plant roots and slow growth. Immediate correction needed!`,
                    type: "alert",
                    npkReadings: { id },
                };
            }
            if (phosphorusNotification) notifyAdmins(phosphorusNotification, "Phosphorus");
        }

        // Potassium Notifications
        if (potassium && now - lastPotassiumNotif.current >= NOTIFICATION_COOLDOWN) {
            let potassiumNotification = null;
            if (potassium <= 70 && potassium > 40) {
                potassiumNotification = {
                    title: "⚠️ Low Potassium Levels!",
                    messageBody: `Potassium levels are at ${potassium}. This may weaken plant disease resistance. Consider adding potassium fertilizer.`,
                    type: "warning",
                    npkReadings: { id },
                };
            } else if (potassium <= 40) {
                potassiumNotification = {
                    title: "🚨 Potassium Depletion Alert!",
                    messageBody: `Potassium has fallen to ${potassium}, which can lead to stunted growth and poor drought resistance. Immediate fertilization is needed!`,
                    type: "alert",
                    npkReadings: { id },
                };
            }
            if (potassiumNotification) notifyAdmins(potassiumNotification, "Potassium");
        }
    }, [nitrogen, phosphorus, potassium]);

    const getNutrientLevel = (value, max) => (value / max) * 100;

    return (
        <div
            className={`p-5 rounded-lg shadow-lg transition-all ${
                darkModePref ? "bg-gray-100 text-black" : "bg-gray-700 text-white"} w-full max-w-2xl mx-auto`}
        >
            <h3 className="mb-5 text-lg font-bold text-center sm:text-left">NPK Levels</h3>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className={`text-left ${darkModePref ? "bg-green-700 text-white" : "bg-blue-900 text-gray-200"}`}>
                            <th className="px-2 py-2">Nutrient</th>
                            <th className="text-center py-2">Value (ppm)</th>
                            <th className="px-10 text-center">Level</th>
                        </tr>
                    </thead>
                    <tbody className={darkModePref ? "bg-gray-100" : "bg-gray-700"}>
                        {[
                            { name: "Nitrogen", value: nitrogen, max: 135 },
                            { name: "Phosphorus", value: phosphorus, max: 90 },
                            { name: "Potassium", value: potassium, max: 90 },
                        ].map((nutrient, index) => (
                            <tr
                                key={index}
                                className={`border-b hover:bg-opacity-20 ${
                                    darkModePref ? "hover:bg-green-300" : "hover:bg-gray-500"
                                } transition`}
                            >
                                <td className="pl-3 py-3 text-sm sm:text-base">{nutrient.name}</td>
                                <td className="py-3 text-center text-sm sm:text-base">{nutrient.value || "--"}</td>
                                <td className="px-3">
                                    <div className="w-full max-w-[250px] sm:max-w-[150px] h-3 bg-gray-300 rounded-lg overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-400 to-green-500 transition-all"
                                            style={{ width: `${nutrient.value ? getNutrientLevel(nutrient.value, nutrient.max) : 0}%` }}
                                        ></div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

NPKLatest.propTypes = {
    darkModePref: PropTypes.bool.isRequired,
    nitrogen: PropTypes.number.isRequired,
    phosphorus: PropTypes.number.isRequired,
    potassium: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
};

export default NPKLatest;
