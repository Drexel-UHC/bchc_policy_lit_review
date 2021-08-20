// Import Modules
import * as dataPolicyModule from '../data/data_donut_policy.js';
import * as dataLinksModule from '../data/data_donut_links.js';
import * as dataOutcomesModule from '../data/data_donut_outcomes.js';
import { makeDonutHC } from './donuts_plotter.js';

// Make donutPolicy
export var donutPolicy = makeDonutHC('donutPolicy', dataPolicyModule.dataDonutPolicy, [
  '#0C2C84',
  '#225EA8',
  '#1D91C0',
  '#41B6C4',
  '#7FCDBB',
  '#C7E9B4',
]);

// Make donutLinks
export var donutLinks = makeDonutHC(
  'donutLinks',
  dataLinksModule.dataDonutLinksDefault,
  [
  '#d73027',
  '#1a9850',
  ]);

// Make donutOutcomes
export var donutOutcomes = makeDonutHC(
  'donutOutcomes',
  dataOutcomesModule.dataDonutOutcomes
);


