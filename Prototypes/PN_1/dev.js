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


const cleanStr = function (str) {
  const result = str.replace(/[^A-Z0-9]/gi, '_');
  return result;
}