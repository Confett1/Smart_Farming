const HumidityTemperature = () => {
    const temperatureValue = 24; // Temperature in Celsius
    const humidityValue = 68;    // Humidity in Percentage

    // Convert values to rotation degrees (assuming 0-100 scale maps to 0-180°)
    const temperatureRotation = (temperatureValue / 100) * 180;
    const humidityRotation = (humidityValue / 100) * 180;

    // Generate tick marks dynamically
    const generateTicks = () => {
        const ticks = [];
        for (let i = 0; i <= 180; i += 30) { // Ticks from 0° to 180°
            ticks.push(
                <div 
                    key={i} 
                    className="absolute w-[2px] h-[10px] bg-white"
                    style={{
                        transform: `rotate(${i - 90}deg) translateY(-65px)`, 
                        transformOrigin: "center bottom"
                    }}
                ></div>
            );
        }
        return ticks;
    };

    return (
        <>
        <div className="rounded-lg relative overflow-hidden bg-gray-100 flex flex-col p-5 shadow-md hover:shadow-lg transition-all">
            <h1 className="mb-5 text-lg text-black font-bold">Climate Conditions</h1>
            <div className="flex mt-5 justify-around h-full">
                {/* Temperature Gauge */}
                <div className="relative w-[45%] h-[200px] flex flex-col items-center">
                    <div className="text-black mb-2 text-base">Temperature</div>
                    <div className="w-[150px] h-[150px] rounded-full bg-black/30 relative overflow-hidden shadow-lg">
                        {/* Tick Marks */}
                        <div className="absolute top-1/2 left-1/2 w-full h-full flex justify-center items-center">
                            {generateTicks()}
                        </div>

                        {/* Gauge Background */}
                        <div className="absolute inset-0 bg-gray-700 rounded-full"></div>

                        {/* Gauge Fill */}
                        <div 
                            className="absolute inset-0 bg-gradient-to-t from-red-600 to-orange-500 rounded-full"
                            style={{ 
                                transform: `rotate(${temperatureRotation}deg)`, 
                                clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)" 
                            }}
                        ></div>

                        {/* Inner Circle */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full bg-black/70 flex justify-center items-center text-white text-xl font-bold shadow-lg">
                            {temperatureValue}°C
                        </div>
                    </div>
                </div>

                {/* Humidity Gauge */}
                <div className="relative w-[45%] h-[200px] flex flex-col items-center">
                    <div className="text-black mb-2 text-base">Humidity</div>
                    <div className="w-[150px] h-[150px] rounded-full bg-black/30 relative overflow-hidden shadow-lg">
                        {/* Tick Marks */}
                        <div className="absolute top-1/2 left-1/2 w-full h-full flex justify-center items-center">
                            {generateTicks()}
                        </div>

                        {/* Gauge Background */}
                        <div className="absolute inset-0 bg-gray-700 rounded-full"></div>

                        {/* Gauge Fill */}
                        <div 
                            className="absolute inset-0 bg-gradient-to-t from-blue-700 to-cyan-400 rounded-full"
                            style={{ 
                                transform: `rotate(${humidityRotation}deg)`, 
                                clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)" 
                            }}
                        ></div>

                        {/* Inner Circle */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full bg-black/70 flex justify-center items-center text-white text-xl font-bold shadow-lg">
                            {humidityValue}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default HumidityTemperature;
