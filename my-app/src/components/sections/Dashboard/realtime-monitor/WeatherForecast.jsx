import { useEffect, useState } from "react";
import PageLoader from "../../../loader/PageLoader";
import API from "../../../../api/api";

const WeatherForecast = () => {
    const [weatherData, setWeatherData] = useState(null);
    const openWeatherApi = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const [notification, setNotification] = useState(null);

    useEffect(() => {
            const fetchWeatherData = async () => {
                try {
                    const city = 'Catarman'; // You can dynamically change this
                    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApi}&units=metric`; // Include the units for temperature in °C
        
                    const response = await fetch(url);
                    const data = await response.json();
                    setWeatherData(data);
                    
                    const humidity = data.main.humidity;
                    let newNotification = null;

                    if (humidity >= 90) {
                        newNotification = {
                            title: "Extreme Humidity Alert!",
                            messageBody: `Humidity has reached ${humidity}%, significantly increasing the chance of rain. Be prepared!`,
                            type: "alert"
                        };
                    } else if (humidity >= 80) {
                        newNotification = {
                            title: "High Humidity Warning",
                            messageBody: `Humidity is at ${humidity}%. Please monitor conditions.`,
                            type: "warning"
                        };
                    } 

                    if (newNotification) {
                        setNotification(newNotification);
                        notifyAdmins(newNotification);
                    }
                        
                } catch (error) {
                    console.error("Error fetching weather data: ", error);
                    
                }
            }
        
        fetchWeatherData();
    }, [openWeatherApi]);

    const notifyAdmins = async (notificationData) => {
        try {
            await API.post("/notifications", notificationData)
        } catch(error) {
            console.error("Error sending notification: ", error);            
        }
    }

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