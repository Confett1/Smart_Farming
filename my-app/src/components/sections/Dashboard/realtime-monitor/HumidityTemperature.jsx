import { Divider } from "@mui/material";
import Humidity from "./HumidityPercentage";
import Temperature from "./Temperature";
import PropTypes from "prop-types";

const HumidityTemperature = ({readings, darkModePref, npkId}) => {

    const temperature = readings?.temperature || 0;
    const huimidity = readings?.humidity || 0;


    return (
        <>
        <div className={`${darkModePref ? "bg-gray-100" : "bg-gray-700 text-gray-200"} rounded-lg relative overflow-hidden flex flex-col p-6.5 shadow-md hover:shadow-lg transition-all`}>
            <h1 className="text-lg font-bold mb-5">Climate Conditions</h1>
            <Divider />
            <div className="flex mt-6 justify-around h-full">
                
                <div className="w-[45%] h-full flex flex-col items-center">
                    <Temperature npkId={npkId} temperature={temperature} darkModePref={darkModePref} />
                    {/* <div className="w-[150px] h-[150px] rounded-full bg-black/30 relative overflow-hidden shadow-lg">
                        
                        <div className="absolute top-1/2 left-1/2 w-full h-full flex justify-center items-center">
                            {generateTicks()}
                        </div>

                        <div className="absolute inset-0 bg-gray-700 rounded-full"></div>

                        <div 
                            className="absolute inset-0 bg-gradient-to-t from-red-600 to-orange-500 rounded-full"
                            style={{ 
                                transform: `rotate(${temperatureRotation}deg)`, 
                                clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)" 
                            }}
                        ></div>

                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full bg-black/70 flex justify-center items-center text-white text-xl font-bold shadow-lg">
                            {temperatureValue}°C
                        </div>
                    </div> */}
                </div>

                {/* Humidity Gauge */}
                <div className="relative w-[45%] h-[200px] flex flex-col items-center">
                    <div className="m-6  shadow-lg rounded-full">
                        <Humidity npkId={npkId} humidity={huimidity} darkModePref={darkModePref} />
                    </div>
                </div>  
            </div>
        </div>
        </>
    );
};

HumidityTemperature.propTypes = {
    readings: PropTypes.any.isRequired,
    darkModePref: PropTypes.bool.isRequired,
    npkId: PropTypes.any.isRequired,
}

export default HumidityTemperature;
