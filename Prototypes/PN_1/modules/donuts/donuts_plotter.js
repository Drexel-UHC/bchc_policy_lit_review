const linkReducer = (total, i) => total + i[1];
const makeTitle = function (id, data) {
  if (id == 'donutPolicy') {
    return `<div><span class="donutTitleBigFont">${data.length}</span><br><span class = "donutTitleSmallFont">Policies</span> </div>`;
  } else if (id == 'donutLinks') {
    return `<div><span class="donutTitleBigFont">${data.reduce(
      linkReducer,
      0
    )}</span><br><span class = "donutTitleSmallFont">Links</span> </div>`;
  } else {
    return `<div><span class="donutTitleBigFont">${data.length}</span><br><span class = "donutTitleSmallFont">Outcomes</span> </div>`;
  }
};
const fitlerRowElement = document.querySelector('.filterRowContainer');

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
      pie: {},
    },
    tooltip: {
      useHTML: true,
      outside: true,
      backgroundColor: '{point.color}',
      borderColor: '{point.color}',
      borderWith: 0,
      padding:0,
      headerFormat: '',
      pointFormat:
        '<div class="donutTooltip" style ="background-color: {point.color};"><i class="fas fa-money-check-alt donutTooltipIcon"></i><div class = "donutTooltipName">{point.name}</div><div > <span class="donutTooltipCount">{point.y}</span> links</div> ',
    },
    // Series Options
    series: [
      {
        data: data,
        allowPointSelect: true,
        borderColor: null,
        allowPointSelect: true,
        cursor: 'pointer',
        colors: fill,
        innerSize: '80%',
        dataLabels: {
          enabled: false,
        },
        point: {
          events: {
            select: function () {
              console.log('DONUT SELECTTTTT');
              console.log(this.colors);
              console.log(this.name);

              
            }
          }
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
    ],
  });
}
