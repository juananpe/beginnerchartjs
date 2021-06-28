const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const util = require('util');

const  fs  = require('fs');

const writeFile = util.promisify(fs.writeFile);

const width = 1000;
const height = 600;
const chartCallback = (ChartJS) => {



    // Global config example: https://www.chartjs.org/docs/latest/configuration/
    ChartJS.defaults.global.elements.rectangle.borderWidth = 2;
    // Global plugin example: https://www.chartjs.org/docs/latest/developers/plugins.html
    ChartJS.plugins.register({
        // plugin implementation
        beforeDraw: (chart, options) => {
			const ctx = chart.ctx;
			ctx.fillStyle = '#FFFFFF';
			ctx.fillRect(0, 0, width, height);
		}
    });
    // New chart type example: https://www.chartjs.org/docs/latest/developers/charts.html
    ChartJS.controllers.MyType = ChartJS.DatasetController.extend({
        // chart implementation
    });
};
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback });


var data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [{
      label: "Altua",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(225,0,0,0.4)",
      borderColor: "red", // The main line color
      borderCapStyle: "square",
      borderDash: [], // try [5, 15] for instance
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "black",
      pointBackgroundColor: "white",
      pointBorderWidth: 1,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "yellow",
      pointHoverBorderColor: "brown",
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      // notice the gap in the data and the spanGaps: true
      data: [65, 59, 80, 81, 56, 55, 40,10 ,60,55,30,78],
      spanGaps: true,
    }, {
      label: "Baxua",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(167,105,0,0.4)",
      borderColor: "rgb(167, 105, 0)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "white",
      pointBackgroundColor: "black",
      pointBorderWidth: 1,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "brown",
      pointHoverBorderColor: "yellow",
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      // notice the gap in the data and the spanGaps: false
      data: [10, 20, 60, 95, 64, 78, 90,20,70,40,70,89],
      spanGaps: false,
    }

  ]
};

// Notice the scaleLabel at the same level as Ticks
var options = {
  scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },
                scaleLabel: {
                     display: true,
                     labelString: "Presioa",
                     fontSize: 30,
                     fontWeight: "Bold" 
                  }
            }]            
        }  
};


(async () => {
    const configuration = {
          type: "line",
          data: data,
          options: options

    };
    const image = await chartJSNodeCanvas.renderToBuffer(configuration);
    await writeFile('/tmp/chartjs/test.png', image);

    // const dataUrl = await chartJSNodeCanvas.renderToDataURL(configuration);
    // const stream = chartJSNodeCanvas.renderToStream(configuration);
})();
