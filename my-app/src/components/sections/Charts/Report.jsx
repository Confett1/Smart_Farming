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

    return data.filter(item => {
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
    waterUsage: 0,
    fertilizerUsage: 0
  });

  const [sums, setSums] = useState({
    currentWeek: { harvest: 0, water: 0, fertilizer: 0 },
    lastWeek: { harvest: 0, water: 0, fertilizer: 0 },
    lastMonth: { harvest: 0, water: 0, fertilizer: 0 },
    lastYear: { harvest: 0, water: 0, fertilizer: 0 }
  });

  const [chartData, setChartData] = useState([]);

  const fetchData = async () => {
    const periods = ["currentWeek", "lastWeek", "lastMonth", "lastYear"];

    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Two-digit month
      const day = String(date.getDate()).padStart(2, '0'); // Two-digit day
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    };

    const data = await Promise.all(
      periods.map(async period => {
        const [harvestData, waterData, fertilizerData] = await Promise.all([
          fetchChartData("harvest", period),
          fetchChartData("water", period),
          fetchChartData("fertilizer", period)
        ]);

        return {
          period,
          latestHarvest: getLatestValue(harvestData),
          latestWater: getLatestValue(waterData),
          latestNitrogen: getLatestValue(fertilizerData.map(f => ({ value: f.nitrogen }))),
          latestPhosphorus: getLatestValue(fertilizerData.map(f => ({ value: f.phosphorus }))),
          latestPotassium: getLatestValue(fertilizerData.map(f => ({ value: f.potassium }))),
          sumHarvest: calculateSum(harvestData),
          sumWater: calculateSum(waterData),
          sumNitrogen: calculateSum(fertilizerData.map(f => ({ value: f.nitrogen }))),
          sumPhosphorus: calculateSum(fertilizerData.map(f => ({ value: f.phosphorus }))),
          sumPotassium: calculateSum(fertilizerData.map(f => ({ value: f.potassium }))),
          formattedData: harvestData.map(item => ({
            date: formatDate(item.timestamp), // Display as MM/DD/YYYY
            sortableDate: new Date(item.timestamp), // Hidden sorting field
            harvest: item.value,
            water: waterData.find(w => w.timestamp === item.timestamp)?.value || 0,
            nitrogen: fertilizerData.find(f => f.timestamp === item.timestamp)?.nitrogen || 0,
            phosphorus: fertilizerData.find(f => f.timestamp === item.timestamp)?.phosphorus || 0,
            potassium: fertilizerData.find(f => f.timestamp === item.timestamp)?.potassium || 0
          }))
        };
      })
    );

    const sumsByPeriod = data.reduce((acc, item) => {
      acc[item.period] = {
        harvest: item.sumHarvest,
        water: item.sumWater,
        fertilizer: item.sumFertilizer
      };
      return acc;
    }, {});

    setSums(sumsByPeriod);
    const sortedData = (data.find(item => item.period === selectedPeriod)?.formattedData || [])
    .sort((a, b) => a.sortableDate - b.sortableDate);

    // Function to generate all dates within the range
    const generateDateRange = (startDate, endDate) => {
      let dates = [];
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        dates.push(formatDate(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    };

    // Find the date range from the data
    const startDate = sortedData.length > 0 ? new Date(sortedData[0].sortableDate) : new Date();
    const endDate = sortedData.length > 0 ? new Date(sortedData[sortedData.length - 1].sortableDate) : new Date();
    const allDates = generateDateRange(startDate, endDate);

    // Fill missing dates with zero values
    const filledData = allDates.map(date => {
      const existing = sortedData.find(item => item.date === date);
      return existing || { date, harvest: 0, water: 0, fertilizer: 0 };
    });

    // Update state with complete data
    setChartData(filledData);



    const currentPeriodData = data.find(item => item.period === selectedPeriod);
    setReportData({
      totalHarvest: currentPeriodData.latestHarvest,
      waterUsage: currentPeriodData.latestWater,
      fertilizerUsage: currentPeriodData.latestFertilizer
    });
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
            <p>Water Usage: {reportData.waterUsage} liters</p>
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
            <p>Water: {sums[selectedPeriod]?.water || 0} liters</p>
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

            <p className="text-lg text-blue-400">Water Usage</p>
            <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="water" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
            
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