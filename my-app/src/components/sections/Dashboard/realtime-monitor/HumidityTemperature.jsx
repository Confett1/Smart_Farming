import Humidity from "./HumidityPercentage";
import Temperature from "./Temperature";

const HumidityTemperature = () => {

    return (
        <>
        <div className="rounded-lg relative overflow-hidden bg-gray-100 flex flex-col p-6.5 shadow-md hover:shadow-lg transition-all">
            <h1 className="text-lg text-black font-bold">Climate Conditions</h1>
            <div className="flex mt-5 justify-around h-full">
                
                <div className="w-[45%] h-full flex flex-col items-center">
                    <Temperature />
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
                    <div className="m-6 bg-black shadow-lg rounded-full">
                        <Humidity />
                    </div>
                </div>  
            </div>
        </div>
        </>
    );
};

export default HumidityTemperature;
