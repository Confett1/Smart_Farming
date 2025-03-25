import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Wheat, Droplet, Sprout } from "lucide-react";
import PropTypes from "prop-types";

const ChartsContent = ({ selectedPeriod, darkModePref }) => {
    const [activeTab, setActiveTab] = useState("harvest");
    const [chartData, setChartData] = useState({
        harvest: { labels: [], data: [] },
        water: { labels: [], data: [] },
        fertilizer: { labels: [], data: [] },
    });

    const chartInstance = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchChartData = async (category) => {
            try {
                const response = await fetch(`http://localhost:8080/charts/${category}`);
                const data = await response.json();

                if (!Array.isArray(data)) {
                    console.error(`Invalid API response for ${category}:`, data);
                    return;
                }

                const now = new Date();
                let filteredData = data.filter((item) => {
                    const itemDate = new Date(item.timestamp);
                    
                    if (selectedPeriod === "currentWeek") {
                        const startOfWeek = new Date();
                        startOfWeek.setDate(now.getDate() - now.getDay());
                        return itemDate >= startOfWeek && itemDate <= now;
                    } else if (selectedPeriod === "lastWeek") {
                        const lastWeekStart = new Date();
                        lastWeekStart.setDate(now.getDate() - now.getDay() - 7);
                        const lastWeekEnd = new Date(lastWeekStart);
                        lastWeekEnd.setDate(lastWeekStart.getDate() + 6);
                        return itemDate >= lastWeekStart && itemDate <= lastWeekEnd;
                    } else if (selectedPeriod === "lastMonth") {
                        const lastMonth = new Date();
                        lastMonth.setMonth(now.getMonth() - 1);
                        return itemDate >= lastMonth && itemDate <= now;
                    } else if (selectedPeriod === "lastYear") {
                        const lastYear = new Date();
                        lastYear.setFullYear(now.getFullYear() - 1);
                        return itemDate >= lastYear && itemDate <= now;
                    }
                    return false;
                });

                filteredData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

                const labels = filteredData.map((item) => new Date(item.timestamp).toLocaleDateString());
                if (category === "fertilizer") {
                    const nitrogen = filteredData.map((item) => item.nitrogen || 0);
                    const phosphorus = filteredData.map((item) => item.phosphorus || 0);
                    const potassium = filteredData.map((item) => item.potassium || 0);
        
                    setChartData((prevData) => ({
                        ...prevData,
                        fertilizer: { labels, nitrogen, phosphorus, potassium },
                    }));
                } else {
                    const values = filteredData.map((item) => item.value);
                    setChartData((prevData) => ({
                        ...prevData,
                        [category]: { labels, data: values },
                    }));
                }  
            } catch (error) {
                console.error(`Error fetching ${category} data:`, error);
            }
        };

        fetchChartData("harvest");

        ["harvest", "water", "fertilizer"].forEach(fetchChartData);
    }, [selectedPeriod]);

    useEffect(() => {
        if (!chartRef.current || chartData[activeTab].labels.length === 0) return;
    
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
    
        const ctx = chartRef.current.getContext("2d");
    
        let datasets = [];
    
        if (activeTab === "fertilizer") {
            datasets = [
                {
                    label: "Nitrogen (N)",
                    data: chartData.fertilizer.nitrogen,
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 2,
                    pointRadius: 4,
                    pointBackgroundColor: "rgba(255, 99, 132, 0.5)",
                    tension: 0.3
                },
                {
                    label: "Phosphorus (P)",
                    data: chartData.fertilizer.phosphorus,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 2,
                    pointRadius: 4,
                    pointBackgroundColor: "rgba(54, 162, 235, 0.5)",
                    tension: 0.3
                },
                {
                    label: "Potassium (K)",
                    data: chartData.fertilizer.potassium,
                    backgroundColor: "rgba(255, 206, 86, 0.2)",
                    borderColor: "rgba(255, 206, 86, 1)",
                    borderWidth: 2,
                    pointRadius: 4,
                    pointBackgroundColor: "rgba(255, 206, 86, 0.5)",
                    tension: 0.3
                }
            ];
        } else {
            datasets = [
                {
                    label: `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} ${activeTab === "harvest" ? "Data" : "Usage"}`,
                    data: chartData[activeTab].data,
                    backgroundColor: darkModePref ? "rgba(75, 192, 192, 0.5)" : "rgba(75, 192, 192, 0.2)",
                    borderColor: darkModePref ? "rgba(48, 114, 114, 0.6)" : "rgba(75, 192, 192, 0.6)",
                    borderWidth: 2,
                    pointRadius: 4,
                    pointBackgroundColor: darkModePref ? "rgba(75, 192, 192, 0.5)" : "#4BC0C0",
                    pointBorderColor: darkModePref ? "rgba(48, 114, 114, 0.6)" : "#fff",
                    tension: 0.3
                }
            ];
        }
    
        chartInstance.current = new Chart(ctx, {
            type: "line",
            data: {
                labels: chartData[activeTab].labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        ticks: { color: darkModePref ? "var(--card-background)" : "#fff", font: { size: 14 } }
                    },
                    y: {
                        ticks: { color: darkModePref ? "var(--card-background)" : "#ffffff", font: { size: 14, weight: "bold" } }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: darkModePref ? "var(--card-background)" : "#ffffff",
                            font: { size: 16, weight: "bold" }
                        }
                    }
                }
            }
        });
    
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [chartData, activeTab]);
    

    return (
        <>
            <div className="summary-cards">
                {["harvest", "water", "fertilizer"].map((key) => {
                    let latestValue = 0;
                    let unit = key === "harvest" ? "kg" : "L";
                    let percentageChange = "";

                    if (key === "fertilizer") {
                        const nitrogen = chartData.fertilizer.nitrogen;
                        const phosphorus = chartData.fertilizer.phosphorus;
                        const potassium = chartData.fertilizer.potassium;

                        latestValue = {
                            N: nitrogen?.length > 0 ? nitrogen[nitrogen.length - 1] : 0,
                            P: phosphorus?.length > 0 ? phosphorus[phosphorus.length - 1] : 0,
                            K: potassium?.length > 0 ? potassium[potassium.length - 1] : 0,
                        };

                        unit = "mg/kg"; // Adjust unit if needed
                    } else {
                        const values = chartData[key].data;
                        if (values?.length > 0) latestValue = values[values.length - 1];

                        if (values?.length > 1) {
                            const latest = values[values.length - 1];
                            const previous = values[values.length - 2];

                            if (previous !== 0) {
                                const change = ((latest - previous) / previous) * 100;
                                percentageChange = change.toFixed(2) + "%";
                                percentageChange = change > 0 ? `↑ ${percentageChange}` : `↓ ${percentageChange}`;
                            } else {
                                percentageChange = latest > 0 ? "↑ 100%" : "No Change";
                            }
                        }
                    }

                    const Icon = key === "harvest" ? Wheat : key === "water" ? Droplet : Sprout;

                    return (
                        <div className={`chartCard ${darkModePref ? "bg-white" : "bg-[var(--card-background)]"}`} key={key}>
                            <div className="card-header">
                                <Icon size={24} className={`icon ${darkModePref ? "text-[var(--card-background)]" : "text-gray-200"}`} />
                                <h3 style={{ color: darkModePref ? "var(--card-background)" : "whitesmoke" }}>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </h3>
                            </div>
                            <div className="card-content">
                                <div style={{ color: darkModePref ? "var(--card-background)" : "white" }} className="value">
                                    {key === "fertilizer"
                                        ? `N: ${latestValue.N} | P: ${latestValue.P} | K: ${latestValue.K} ${unit}`
                                        : `${latestValue} ${unit}`}
                                </div>
                                <p className={`trend ${darkModePref ? "text-gray-500" : "text-[var(--muted-color)]"}`}>{percentageChange}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="tabs ">
                {["harvest", "water", "fertilizer"].map((key) => (
                    <button
                        key={key}
                        className={`tab-btn ${darkModePref ? "text-gray-500" : "text-[var(--muted-color)]"} ${activeTab === key ? "active" : ""}`}
                        onClick={() => setActiveTab(key)}
                    >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                ))}
            </div>

            <div className={`chart-container ${darkModePref ? "bg-white" : "bg-[#1e293b]"}`}>
                <canvas ref={chartRef}></canvas>
            </div>
        </>
    );
};

ChartsContent.propTypes = {
    selectedPeriod: PropTypes.string.isRequired,
    darkModePref: PropTypes.bool.isRequired
}

export default ChartsContent;
