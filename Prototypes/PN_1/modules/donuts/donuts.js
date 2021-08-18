
// Data Imports
import * as dataPolicyModule from '../data/data_donut_policy.js';
import * as dataLinksModule from '../data/data_donut_links.js';
import * as dataOutcomesModule from '../data/data_donut_outcomes.js';

// Plotting function Imports
import { makeDonut } from './donuts_plotter.js';
import { makeDonutHC } from './donuts_plotter_HC.js';
// Policy
export var donutPolicy = makeDonutHC('donutPolicy', dataPolicyModule.dataDonutPolicy, [
  '#0C2C84',
  '#225EA8',
  '#1D91C0',
  '#41B6C4',
  '#7FCDBB',
  '#C7E9B4',
]);



//  var p = Array.from(
//    document
//      .querySelector('#donutPolicy')
//      .querySelector('.highcharts-pie-series').childNodes
//  );

export var donutLinks = makeDonutHC(
  'donutLinks',
  dataLinksModule.dataDonutLinksDefault,
  [
  '#d73027',
  '#1a9850',
]);

export var donutOutcomes = makeDonutHC(
  'donutOutcomes',
  dataOutcomesModule.dataDonutOutcomes
);


