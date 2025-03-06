import ReactECharts from 'echarts-for-react';
import PropTypes from 'prop-types';

const NpkChart = ({ readings }) => {
    // Ensure that we have readings before rendering the chart
    const option = {
        title: {
            text: 'NPK Chart',
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: ['Nitrogen', 'Phosphorous', 'Potassium'],
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
            data: readings.map(reading =>
                new Date(reading.timestamp).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                })
            ),
        },
        yAxis: {
            type: 'value',
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

    return <ReactECharts option={option} />;
};

NpkChart.propTypes = {
    readings: PropTypes.any.isRequired
}

export default NpkChart;
