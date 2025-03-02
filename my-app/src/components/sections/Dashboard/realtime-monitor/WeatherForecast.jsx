import { useEffect, useState } from "react";
import PageLoader from "../../../loader/PageLoader";

const WeatherForecast = () => {
    const [weatherData, setWeatherData] = useState(null);
    const openWeatherApi = import.meta.env.VITE_OPENWEATHER_API_KEY;

    useEffect(() => {
        const fetchWeatherData = async () => {
            const city = 'Catarman'; // You can dynamically change this
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApi}&units=metric`; // Include the units for temperature in °C

            const response = await fetch(url);
            const data = await response.json();
            setWeatherData(data);
        };

        fetchWeatherData();
    }, [openWeatherApi]);

    if (!weatherData) {
        return <div className="-ml-[300px]"><PageLoader /></div>;
    }

    return (
        <>
            {/*<!-- Weather Forecast Card -->*/}
            <div className="card weather-card">
                <div className="card-header">
                    <h3>Weather Forecast</h3>
                </div>
                <div className="card-body">
                    <div className="current-weather">
                        <div className="weather-primary">
                            <div className="weather-icon">
                                <i className="fas fa-sun"></i>
                            </div>
                            <div className="weather-info">
                                <div className="temperature">{weatherData.main.temp}°C</div>
                                <div className="condition">{weatherData.weather[0].description}</div>
                            </div>
                        </div>
                        <div className="weather-details">
                            <div className="detail-item">
                                <i className="fas fa-tint"></i>
                                <span>Humidity: {weatherData.main.humidity}%</span>
                            </div>
                            <div className="detail-item">
                                <i className="fas fa-wind"></i>
                                <span>Wind: {weatherData.wind.speed} km/h</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WeatherForecast;