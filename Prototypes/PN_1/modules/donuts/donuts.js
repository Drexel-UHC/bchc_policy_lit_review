
// Data Imports
import { dataDonutPolicy,dataDonutPolicyFill} from '../data/data_donut_policy.js';
import {dataDonutLinksDefault,dataDonutLinks,dataDonutLinksFill,} from '../data/data_donut_links.js';
import {dataDonutOutcomes} from '../data/data_donut_outcomes.js';

// Plotting function Imports
import { makeDonut } from './donuts_plotter.js';


// Policy
export var donutPolicy = makeDonut(
  '#donutPolicy',
  'Policy',
  dataDonutPolicy,
  dataDonutPolicyFill
);



export var donutLinks = makeDonut(
  '#donutLinks',
  'Links',
  dataDonutLinksDefault,
  dataDonutLinksFill
);
export var donutOutcomes = makeDonut('#donutOutcomes',
  'Outcomes',
  dataDonutOutcomes,
  {});
