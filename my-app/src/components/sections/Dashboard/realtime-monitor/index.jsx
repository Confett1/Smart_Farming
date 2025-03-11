import { useEffect, useState } from 'react';
import {Typography } from '@mui/material';
import API from '../../../../api/api';
import NpkChart from './NpkChart';
import WeatherForecast from './WeatherForecast';
// import WaterLevel from './WaterLevel';
import HumidityTemperature from './HumidityTemperature';
import NPKLatest from './NPKLatest';
import SoilMoisture from './SoilMoisture';

const RealTimeMonitor = () => {
    const [fiveLatestReadings, setFiveLatestReadings] = useState([]);
    const [latestNPKReading, setLatestNPKReading] = useState({
        nitrogen: "--",
        phosphorous: "--",
        potassium: "--",
    });
    const darkModePref = JSON.parse(localStorage.getItem('darkmode'));

    const fetchLatestReading = () => {
        API.get("/npk/latest")
        .then((response) => {
            setLatestNPKReading(response.data);
        })
        .catch(error => console.error("Error fetching NPK data", error));
    }

    const fetchFiveLatestReadings = async () => {
        try {
            const response = await API.get("/npk/latest5");
            setFiveLatestReadings(response.data);
        } catch (error) {
            console.error("Error fetching NPK readings", error);
        }
    }

    useEffect(() => {
        fetchLatestReading();
        fetchFiveLatestReadings();
        console.log(latestNPKReading);
        
        const interval = setInterval(fetchFiveLatestReadings, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
        <div className={`page-name my-2 ${darkModePref ? "text-[#2c3e50]" : "text-gray-200"}`}>
            <h2>Dashboard</h2>
        </div>
        <section className={`monitoring ${darkModePref ? "bg-gray-200" : "bg-gray-800 text-gray-200"}`} >
            <Typography sx={{ textAlign: 'left', fontWeight: 600, mb: -1.5 }}>Real-Time Monitoring</Typography>
            <div className="monitoring-grid">
                <NPKLatest darkModePref={darkModePref} />
                <SoilMoisture soilMoisture={latestNPKReading?.soilMoisture? latestNPKReading.soilMoisture : 0} darkModePref={darkModePref} />
                <HumidityTemperature readings={latestNPKReading} darkModePref={darkModePref}/>
                <NpkChart readings={fiveLatestReadings} darkModePref={darkModePref} />
                {/* <WaterLevel /> */}
                <WeatherForecast darkModePref={darkModePref} />
            </div>
        </section>
        </>
    );
};

export default RealTimeMonitor;
