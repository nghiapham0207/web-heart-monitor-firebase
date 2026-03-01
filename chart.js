import { Beat } from './firebase.js'
import { MIN_BEAT, MAX_BEAT } from './constants.js';

// setup
const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# Beat Per Second',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            yAxisID: 'yAxis',
        },
        {
            type: 'line',
            label: '# Oxygen Per Second',
            data: [],
            borderColor: '#36A2EB',
            backgroundColor: '#9BD0F5',
            borderWidth: 1,
            yAxisID: 'percentage',
        },
    ]
}
var isPaused = false;
function pauseChart() {
    isPaused = isPaused ? false : true
    config.options.plugins.streaming.pause = isPaused
    // myChart.options.plugins.streaming.pause = isPaused
    // myChart.update({delay: 0});
}
export { pauseChart }
// config
const config = {
    type: 'line',
    data,
    options: {
        responsive: true,
        // stacked: false,
        plugins: {
            streaming: {
                pause: isPaused
            },
            title: {
                display: true,
                text: 'Heart Rate Monitoring'
            },
        },
        //tương tác
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            x: {
                type: 'realtime',
                realtime: {
                    onRefresh: chart => {
                        chart.data.datasets.forEach(dataset => {
                            // dataset.data.push({
                            //     x: Date.now(),
                            //     // y: Beat.getValue()
                            //     y: Math.floor(Math.random() * (MAX_BEAT - MIN_BEAT)) + MIN_BEAT,
                            // })
                            console.log(dataset);
                            switch (dataset.label) {
                                case '# Beat Per Second':
                                    dataset.data.push({
                                        x: Date.now(),
                                        y: 120,
                                    });
                                    break;
                                case '# Oxygen Per Second':
                                    dataset.data.push({
                                        x: Date.now(),
                                        y: 50,
                                    });
                                    break;
                                default:
                                    break;
                            }
                        })
                    }
                },
            },
            // y: {
            //     // beginAtZero: false,
            //     min: MIN_BEAT,
            //     max: MAX_BEAT
            // },
            yAxis: {
                min: MIN_BEAT,
                max: MAX_BEAT,
                type: 'linear',
                position: 'left'
            },
            percentage: {
                // beginAtZero: true,
                min: 0,
                max: 100,
                type: 'linear',
                position: 'right',
                // grid line settings
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            }
        }
    }
}
// render
const ctx = document.getElementById('myChart')
const myChart = new Chart(ctx, config)