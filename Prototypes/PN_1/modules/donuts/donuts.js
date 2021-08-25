// Import Modules
import { dataDonutPolicy } from '../data/data_donut_policy.js';
import { dataDonutLinksDefault } from '../data/data_donut_links.js';
import { dataDonutOutcomes } from '../data/data_donut_outcomes.js';
import * as fill from './donut_fill.js';
import { makeDonutHC } from './donuts_plotter.js';

// Make donutPolicy
export var donutPolicy = makeDonutHC(
  'donutPolicy',
  dataDonutPolicy,
  fill.fillPolicy
);

// Make donutLinks
export var donutLinks = makeDonutHC(
  'donutLinks',
  dataDonutLinksDefault,
  fill.fillLinks
);

// Make donutOutcomes
export var donutOutcomes = makeDonutHC('donutOutcomes', dataDonutOutcomes);
