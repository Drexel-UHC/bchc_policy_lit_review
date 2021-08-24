import {
  renderFilterRow,
  clearFilterRow,
  clearAllFilters,
  fitlerRowElement,
  placeHolder,
} from './donuts_render_filterRow.js';
import {
  animationDuration,
  frameDuration,
  totalFrames,
  animateCountTo,
} from './donuts_count_animator.js';

const linkReducer = (total, i) => total + i[1];
const makeTitle = function (id, data) {
  if (id == 'donutPolicy') {
    return `<div><span class="donutTitleBigFont" id = "${id}Counter">${data.length}</span><br><span class = "donutTitleSmallFont">Policies</span> </div>`;
  } else if (id == 'donutLinks') {
    return `<div><span class="donutTitleBigFont" id = "${id}Counter">${data.reduce(
      linkReducer,
      0
    )}</span><br><span class = "donutTitleSmallFont">Links</span> </div>`;
  } else {
    return `<div><span class="donutTitleBigFont" id = "${id}Counter">${data.length}</span><br><span class = "donutTitleSmallFont">Outcomes</span> </div>`;
  }
};

export function makeDonutHC(id, data, fill) {
  var chart = new Highcharts.Chart({
    // Chart Options
    chart: {
      renderTo: id,
      type: 'pie',
      height: 200,
    },
    title: {
      text: makeTitle(id, data),
      align: 'center',
      verticalAlign: 'middle',
      y: 30,
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
    // Plot options
    plotOptions: {
      pie: {
        borderColor: null,
        allowPointSelect: id !== 'donutLinks',
        cursor: 'pointer',
        colors: fill,
        innerSize: '80%',
        dataLabels: {
          enabled: false,
        },
        point: {
          events: {
            click: function () {
              console.log(event.point);
              if (!event.point.selected) {
                // Select: If we clicked on a point that was not previously clicked
                animateCountTo(id, 1);
                if (id !== 'donutLinks') {
                  renderFilterRow(this, id);
                }
              } else {
                // Unselect: If we clicked on a point that was already selected
                animateCountTo(id, data.length);
                clearFilterRow(id);
              }
            },
          },
        },
        states: {
          inactive: {
            opacity: 1,
          },
          hover: {
            brightness: 0,
            halo: {
              opacity: 1,
              size: 12,
            },
          },
        },
      },
    },
    tooltip: {
      useHTML: true,
      outside: true,
      backgroundColor: '{point.color}',
      borderColor: '{point.color}',
      borderWith: 0,
      padding: 0,
      headerFormat: '',
      pointFormat:
        '<div class="donutTooltip" style ="background-color: {point.color};"><i class="fas fa-money-check-alt donutTooltipIcon"></i><div class = "donutTooltipName">{point.name}</div><div > <span class="donutTooltipCount">{point.y}</span> links</div> ',
    },
    // Series Options
    series: [
      {
        data: data,
      },
    ],
  });

  return chart;
}
