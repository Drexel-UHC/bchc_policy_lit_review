import { renderFilterRow } from './donuts_renderFilterRow.js';
import { handleClearAll } from './donuts_handleClearAll.js';
import { deselectFilterRow } from './donuts_handleDeselect.js';
import { animateCountTo } from './donuts_count_animator.js';
import {
  makeTitle,
  updateGlobalVariables,
  consoleLogGlobals,
  updateOpacityInactivePoints,
  updateLinksDonut,
  updateOutcomesDonut
} from './donuts_util.js';
import { updateGrid } from '../grid/grid.js';



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
              const selectEvent = !event.point.selected;
              const deselectEvent = !selectEvent;
              if (selectEvent) {
                if (id === 'donutPolicy') {
                  animateCountTo(id, 1);
                  renderFilterRow(this, id);
                  updateGlobalVariables(id, this.name);
                  updateOpacityInactivePoints(
                    id,
                    'highcharts-point-inactive',
                    0.4
                  );
                  consoleLogGlobals();(id === 'donutPolicy')
                  updateLinksDonut();
                  updateOutcomesDonut()
                  updateGrid();
                } else if (id === 'donutOutcomes') {
                  animateCountTo(id, 1);
                  renderFilterRow(this, id);
                  updateGlobalVariables(id, this.name);
                  updateOpacityInactivePoints(
                    id,
                    'highcharts-point-inactive',
                    0.4
                  );
                  consoleLogGlobals();
                  updateLinksDonut();
                  // updatePolicyDonut();
                  updateGrid();

                }
              } else if (deselectEvent) {
                animateCountTo(id, data.length);
                deselectFilterRow(id);
                updateGlobalVariables(id, 'All');
                updateOpacityInactivePoints(id, 'highcharts-point-inactive', 1);
                consoleLogGlobals();
                updateLinksDonut();
                updateGrid();
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
          select: {
            halo: {
              opacity: 1,
              size: 30,
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
