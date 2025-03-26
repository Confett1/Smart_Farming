import { useEffect, useState } from 'react';
import { X, Printer } from 'lucide-react';
import logoicon from "../../../assets/images/logo.png";
import "../../../styles/print.css";
import PropTypes from "prop-types";
import { LineChart, Line, XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer } from 'recharts';

const fetchChartData = async (category, selectedPeriod) => {
  try {
    const response = await fetch(`http://localhost:8080/charts/${category}`);
    const data = await response.json();

    const now = new Date();

    const filteredData = data.filter(item => {
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

    if (category === "fertilizer") {
      return filteredData.map(item => ({
        timestamp: item.timestamp,
        nitrogen: item.nitrogen || 0,
        phosphorus: item.phosphorus || 0,
        potassium: item.potassium || 0,
      }));
    } else {
      return filteredData.map(item => ({
        timestamp: item.timestamp,
        value: item.value,
      }));
    }
  } catch (error) {
    console.error(`Error fetching ${category} data:`, error);
    return [];
  }
};

const calculateSum = (data) => data.reduce((sum, item) => sum + item.value, 0);

const getLatestValue = (data) => data.length > 0 ? data[data.length - 1].value : 0;

export function Report({ selectedPeriod, onClose }) {
  const [reportData, setReportData] = useState({
    totalHarvest: 0,
    nitrogenUsage: 0,
    phosphorusUsage: 0,
    potassiumUsage: 0
  });

  const [sums, setSums] = useState({
    currentWeek: { harvest: 0, nitrogen: 0, phosphorus: 0, potassium: 0 },
    lastWeek: { harvest: 0, nitrogen: 0, phosphorus: 0, potassium: 0 },
    lastMonth: { harvest: 0, nitrogen: 0, phosphorus: 0, potassium: 0 },
    lastYear: { harvest: 0, nitrogen: 0, phosphorus: 0, potassium: 0 }
  });

  const [chartData, setChartData] = useState([]);

  const fetchData = async () => {
    const periods = ["currentWeek", "lastWeek", "lastMonth", "lastYear"];

    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${month}/${day}/${year} ${hours}:${minutes}`;
    };

    const data = await Promise.all(
      periods.map(async period => {
        const [harvestData, fertilizerData] = await Promise.all([
          fetchChartData("harvest", period),
          fetchChartData("fertilizer", period)
        ]);

        // Combine all data points without date filling
        const combinedData = [];
        
        // Add all harvest data points
        harvestData.forEach(item => {
          combinedData.push({
            date: formatDate(item.timestamp),
            sortableDate: new Date(item.timestamp),
            harvest: item.value,
            nitrogen: 0,
            phosphorus: 0,
            potassium: 0
          });
        });

        // Add all fertilizer data points
        fertilizerData.forEach(item => {
          combinedData.push({
            date: formatDate(item.timestamp),
            sortableDate: new Date(item.timestamp),
            harvest: 0,
            nitrogen: item.nitrogen || 0,
            phosphorus: item.phosphorus || 0,
            potassium: item.potassium || 0
          });
        });

        // Sort combined data by timestamp
        combinedData.sort((a, b) => a.sortableDate - b.sortableDate);

        return {
          period,
          latestHarvest: getLatestValue(harvestData),
          latestNitrogen: getLatestValue(fertilizerData.map(f => ({ value: f.nitrogen }))),
          latestPhosphorus: getLatestValue(fertilizerData.map(f => ({ value: f.phosphorus }))),
          latestPotassium: getLatestValue(fertilizerData.map(f => ({ value: f.potassium }))),
          sumHarvest: calculateSum(harvestData),
          sumNitrogen: calculateSum(fertilizerData.map(f => ({ value: f.nitrogen }))),
          sumPhosphorus: calculateSum(fertilizerData.map(f => ({ value: f.phosphorus }))),
          sumPotassium: calculateSum(fertilizerData.map(f => ({ value: f.potassium }))),
          formattedData: combinedData
        };
      })
    );

    const sumsByPeriod = data.reduce((acc, item) => {
      acc[item.period] = {
        harvest: item.sumHarvest,
        nitrogen: item.sumNitrogen,
        phosphorus: item.sumPhosphorus,
        potassium: item.sumPotassium
      };
      return acc;
    }, {});

    setSums(sumsByPeriod);

    const currentPeriodData = data.find(item => item.period === selectedPeriod);
    if (currentPeriodData) {
      setReportData({
        totalHarvest: currentPeriodData.latestHarvest,
        nitrogenUsage: currentPeriodData.latestNitrogen,
        phosphorusUsage: currentPeriodData.latestPhosphorus,
        potassiumUsage: currentPeriodData.latestPotassium
      });
      
      // Use all data points directly without date filling
      setChartData(currentPeriodData.formattedData);
    }
  };

  useEffect(() => {
    fetchData();

    document.body.classList.add('modal-open');

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [selectedPeriod]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center pt-11 bg-opacity-10 z-50">
      <div className="bg-white shadow-lg rounded-lg relative max-h-[70vh] w-full max-w-[600px] overflow-y-auto print:container">
        <div className="absolute top-4 right-4 flex space-x-4 print:hidden">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors" onClick={onClose}>
            <X className="h-6 w-6 text-gray-700" />
          </button>
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors" onClick={handlePrint}>
            <Printer className="h-6 w-6 text-gray-700" />
          </button>
        </div>
        <div className="mx-auto bg-white p-8 flex flex-col print:p-4">
          <div className="flex justify-between items-start border-b pb-4 mb-6">
            <h1 className="text-xl font-bold text-gray-900">Agricultural Performance Report</h1>
            <img src={logoicon} alt="Logo" className="h-12 w-12" />
          </div>

          <p className="text-lg font-semibold mb-4">Latest data of {selectedPeriod === "currentWeek" ? "Current week:" :
                  selectedPeriod === "lastWeek" ? "Last week:" :
                  selectedPeriod === "lastMonth" ? "Last month:" :
                  "Last year:"}
          </p>
          <div className="space-y-2">
            <p>Total Harvest: {reportData.totalHarvest} kg</p>
            <p>Nitrogen Usage: {reportData.nitrogenUsage} kg</p>
            <p>Phosphorus Usage: {reportData.phosphorusUsage} kg</p>
            <p>Potassium Usage: {reportData.potassiumUsage} kg</p>
          </div>

          <p className="text-lg font-semibold mt-6">Sums of Data {selectedPeriod === "currentWeek" ? "Current week:" :
                  selectedPeriod === "lastWeek" ? "Last week:" :
                  selectedPeriod === "lastMonth" ? "Last month:" :
                  "Last year:"}
          </p>
          <div className="space-y-2">
            <p>Harvest: {sums[selectedPeriod]?.harvest || 0} kg</p>
            <p>Nitrogen: {sums[selectedPeriod]?.nitrogen || 0} kg</p>
            <p>Phosphorus: {sums[selectedPeriod]?.phosphorus || 0} kg</p>
            <p>Potassium: {sums[selectedPeriod]?.potassium || 0} kg</p>
          </div>

          <div className="mt-6">
            <p className="text-lg font-semibold">Trend Overview:</p>
            <p className="text-lg text-green-400">Harvest</p>
            <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="harvest" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
            
            <div className="fertilizer-chart-container">
              <p className="text-lg text-orange-400">Fertilizer</p>
              <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="nitrogen" stroke="#ff7300" name="Nitrogen" />
                <Line type="monotone" dataKey="phosphorus" stroke="#4CAF50" name="Phosphorus" />
                <Line type="monotone" dataKey="potassium" stroke="#2196F3" name="Potassium" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t text-sm text-gray-500 flex justify-end">Page 1 of 1</div>
        </div>
      </div>
    </div>
  );
}

Report.propTypes = {
  selectedPeriod: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Report;