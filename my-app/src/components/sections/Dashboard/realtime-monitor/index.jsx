import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import API from '../../../../api/api';
import NpkChart from './NpkChart';
import WeatherForecast from './WeatherForecast';
// import WaterLevel from './WaterLevel';
// import Fertilizer from './Fertilizer';
import HumidityTemperature from './HumidityTemperature';
import NPKLatest from './NPKLatest';
import SoilMoisture from './SoilMoisture';

const RealTimeMonitor = () => {
    const [fiveLatestReadings, setFiveLatestReadings] = useState([]);
    // const [latestNPKReading, setLatestNPKReading] = useState({
    //     nitrogen: "--",
    //     phosphorous: "--",
    //     potassium: "--",
    // });

    // const fetchLatestReading = () => {
    //     API.get("/npk/latest")
    //     .then((response) => {
    //         setLatestNPKReading(response.data);
    //     })
    //     .catch(error => console.error("Error fetching NPK data", error));
    // }

    const fetchFiveLatestReadings = async () => {
        try {
            const response = await API.get("/npk/latest5");
            setFiveLatestReadings(response.data);
        } catch (error) {
            console.error("Error fetching NPK readings", error);
        }
    }

    useEffect(() => {
        // fetchLatestReading();
        fetchFiveLatestReadings();

        const interval = setInterval(fetchFiveLatestReadings, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="monitoring">
            <Typography sx={{ textAlign: 'left', fontWeight: 600, mb: -1.5 }}>Real-Time Monitoring</Typography>
            <div className="monitoring-grid">
                {/* NPK Monitoring */}
                {/* <div className="card">
                    <div className="card-header">
                        <h3>NPK Monitoring</h3>
                    </div>
                    <div className="npk-values">
                        <div className="value-box"><span>N</span><div id="n-value">{latestNPKReading.nitrogen}</div></div>
                        <div className="value-box"><span>P</span><div id="p-value">{latestNPKReading.phosphorous}</div></div>
                        <div className="value-box"><span>K</span><div id="k-value">{latestNPKReading.potassium}</div></div>
                    </div>
                </div> */}

                {/* NPK Chart */}
                <NPKLatest />
                <SoilMoisture />
                <HumidityTemperature />
                <NpkChart readings={fiveLatestReadings} />
                {/* <WaterLevel /> */}
                <WeatherForecast />
                {/* <Fertilizer /> */}
            </div>
        </section>
    );
};

export default RealTimeMonitor;
