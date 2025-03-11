import { Divider } from "@mui/material";
import PropTypes from "prop-types";
// import GaugeChart from "react-gauge-chart";
import GaugeComponent from "react-gauge-component";

const SoilMoisture = ({soilMoisture, darkModePref}) => {
    const moistureLevel = soilMoisture <= 25 ? "dry" : soilMoisture <=75 ? "moist" : "wet";
    return (
        <>
            <div className={`shadow-md ${darkModePref ? "bg-gray-100" : "bg-gray-700"} hover:shadow-lg transition-all items-center justify-center p-5 rounded-lg`}>
                <h3 className="font-bold mb-5 text-lg">Soil Moisture</h3>
                <Divider />
                <div className="flex justify-center items-center">
                    <div className="w-full mt-5">
                    {/* <GaugeChart
                        id="soilMoisture"
                        arcsLength={[0.25, 0.50, 0.25]}
                        colors={["red", "orange", "blue"]}
                        percent={percent}
                        textColor="black"
                        arcPadding={0.02}
                        needleColor={"#5392ff"}
                    /> */}
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
                            // subArcs: [
                            //     {
                            //         color: "red",
                            //         showTick: true,
                            //     },
                            //     {
                            //         limit: 75,
                            //         color: "orange"
                            //     },
                            //     {
                            //         limit: 100,
                            //         color: "blue"
                            //     }
                            // ],
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