const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const util = require('util');

const  fs  = require('fs');

const writeFile = util.promisify(fs.writeFile);

const width = 400;
const height = 400;
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

(async () => {
    const configuration = {
        type: 'line',
  "data": {
    "labels": [
      "Enero",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July"
    ],
    "datasets": [
      {
        "label": "My First dataset",
       "borderColor": "rgb(54,+162,+235)",
        "backgroundColor": "rgba(54,+162,+235,+.5)",
          "data": [
          57.0,
          90.0,
          11.0,
          -15.0,
          37.0,
          -37.0,
          -27.0
        ]
      },
      {
        "label": "My Third dataset",
        "borderColor": "rgb(75,+192,+192)",
        "backgroundColor": "rgba(75,+192,+192,+.5)",
        "data": [20.0,10.0,10.0,98.0,0.0,40.0,70.0]
      }
     ]
  },
 
  "options": {
    "title": {
      "display": true,
      "text": "Chart.js Line Chart"
    },
    "scales": {
      "xAxes": [
        {
          "scaleLabel": {
            "display": true,
            "labelString": "Month"
          }
        }
      ],
      "yAxes": [
        {
          "stacked": true,
          "scaleLabel": {
            "display": true,
            "labelString": "Value"
          }
        }
      ]
    }
  }


    };
    const image = await chartJSNodeCanvas.renderToBuffer(configuration);
    await writeFile('/tmp/chartjs/test.png', image);

    // const dataUrl = await chartJSNodeCanvas.renderToDataURL(configuration);
    // const stream = chartJSNodeCanvas.renderToStream(configuration);
})();
