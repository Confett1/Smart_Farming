import { useEffect, useState } from "react";
import IrrigationContent from "./IrrigationData";

const IrrigationComponent = () => {
    const [weatherData, setWeatherData] = useState(null);

    // Use the correct prefix for Vite: import.meta.env.VITE_...
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
        return <div>Loading...</div>;
    }
    return (
        <>
            <section>
                <div className="page-name">
                    <h2 className="text-left">Real-time Monitoring</h2>
                </div>
                <div className="monitoring-grid">
                    {/*<!-- Field Water Level Monitoring Card -->*/}
                    <div className="card field-water-card">
                        <div className="card-header">
                            <h3>Water Level Monitoring</h3>
                        </div>
                        <div className="card-body">
                            <div className="field-monitoring-grid">
                                <div className="field-plot" data-water-level="85">
                                    <div className="field-container">
                                        <div className="field-visual">
                                            <div className="water-overlay">
                                                <div className="water-ripples"></div>
                                            </div>
                                            <div className="level-indicator">
                                                <div className="level-marks">
                                                    <span className="mark overflow">15cm</span>
                                                    <span className="mark optimal">10cm</span>
                                                    <span className="mark minimum">5cm</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="plot-info">
                                            <div className="water-stats">
                                                <span className="current-status optimal">Optimal Level</span>
                                                <span className="water-depth">Water Depth: 12cm</span>
                                            </div>
                                            <div className="drainage-status">
                                                <i className="fas fa-water"></i>
                                                <span>Drainage Gate: Closed</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field-overview">
                                <div className="overview-stats">
                                    <div className="stat-row">
                                        <div className="stat-item">
                                            <i className="fas fa-chart-line"></i>
                                            <div className="stat-info">
                                                <span className="stat-label">Average Water Level</span>
                                                <div className="stat-value">10.5 cm</div>
                                            </div>
                                        </div>
                                        <div className="stat-item">
                                            <i className="fas fa-history"></i>
                                            <div className="stat-info">
                                                <span className="stat-label">Last Drainage</span>
                                                <div className="stat-value">2h ago</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

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

                    {/*<!-- Fertilizer and Pesticide Levels Section -->*/}
                    <div className="card chart-card">
                        <div className="card-header">
                            <h3>Fertilizer and Pesticide Levels</h3>
                        </div>
                        <div className="card-body">
                            <div className="idental-chart">
                                <div className="chart-item fertilizer-chart">
                                    <span className="chart-label">Fertilizer Level</span>
                                    <div className="chart-bar orange-bar" style={{ height: '70%' }}></div>
                                    <span className="chart-value">70%</span>
                                </div>
                                <div className="chart-item pesticide-chart">
                                    <span className="chart-label">Pesticide Level</span>
                                    <div className="chart-bar green-bar" style={{ height: '50%' }}></div>
                                    <span className="chart-value">50%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <IrrigationContent />
        </>
    );
};

export default IrrigationComponent;
