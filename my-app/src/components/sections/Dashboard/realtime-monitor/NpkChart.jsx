import ReactECharts from 'echarts-for-react';
import PropTypes from 'prop-types';

const NpkChart = ({ readings, darkModePref }) => {
    // Ensure that we have readings before rendering the chart
    const option = {
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: ['Nitrogen', 'Phosphorous', 'Potassium'],
            textStyle: {
                color: darkModePref ? "#1F2937" : "#E5E7EB" 
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
        },
        toolbox: {
            feature: {
                saveAsImage: {},
            },
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            textStyle: {
                color: darkModePref ? "white" : "white" 
            },
            data: [...readings].reverse().map(reading =>
                new Date(reading.timestamp).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                })
            ),
        },
        yAxis: {
            type: 'value',
            textStyle: {
                color: darkModePref ? "#1F2937" : "#E5E7EB" 
            }
        },
        series: [
            {
                name: 'Nitrogen',
                type: 'line',
                stack: 'Total',
                data: readings.map(reading => reading.nitrogen),
            },
            {
                name: 'Phosphorous',
                type: 'line',
                stack: 'Total',
                data: readings.map(reading => reading.phosphorous),
            },
            {
                name: 'Potassium',
                type: 'line',
                stack: 'Total',
                data: readings.map(reading => reading.potassium),
            },
        ],
    };

    return (
        <div className={`${darkModePref ? "bg-gray-100" : "bg-gray-700"} p-6 rounded-lg shadow-md hover:shadow-lg transition-all`}>
            <h3 className='mb-5 text-lg font-bold'>NPK Chart</h3>
            <ReactECharts option={option} />
        </div>
    );
};

NpkChart.propTypes = {
    readings: PropTypes.any.isRequired,
    darkModePref: PropTypes.bool.isRequired
}

export default NpkChart;
