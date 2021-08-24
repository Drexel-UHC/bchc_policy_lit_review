const dataDonutPolicy = [
  ['Income', 56],
  ['Discrimination', 47],
  ['Housing', 46],
  ['Tax', 33],
  ['Education and Childcare', 30],
  ['Insurance', 11],
];
const newdataDonutPolicy = [
  ['Income', 1],
  ['Discrimination', 1],
  ['Housing', 10],
  ['Tax', 10],
  ['Education and Childcare', 10],
  ['Insurance', 10],
];

const resetHC = function () {
  // Remove all Seriesi
  const chart = Highcharts.charts[0];
  selectedPoints = chart.getSelectedPoints()[0];
  chart.getSelectedPoints()[0].select(false);
};
