import { Divider } from "@mui/material";
import PropTypes from "prop-types";
import GaugeChart from "react-gauge-chart";

const SoilMoisture = ({soilMoisture}) => {
    const percent = soilMoisture / 100;

    const moistureLevel = soilMoisture <= 25 ? "dry" : soilMoisture <=75 ? "moist" : "wet";
    
    return (
        <>
            <div className="shadow-md bg-gray-100 items-center justify-center p-5 rounded-lg">
                <h3 className="font-bold mb-5 text-lg">Soil Moisture</h3>
                <Divider />
                <div className="w-full mt-5">
                    <GaugeChart
                        id="soilMoisture"
                        arcsLength={[0.25, 0.50, 0.25]}
                        colors={["red", "orange", "blue"]}
                        percent={percent}
                        textColor="black"
                        arcPadding={0.02}
                        needleColor={"#5392ff"}
                    />
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
    soilMoisture: PropTypes.any.isRequired
}

export default SoilMoisture;