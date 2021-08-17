import { sampleData, makeDonutExample } from './donuts_plotterExample.js';
import { makeDonutPolicy } from './donuts_plotterPolicy.js';
import dataDonutPolicy from '../data/data_donut_policy.js';
import { dataDonutLinksDefault,dataDonutLinks,} from '../data/data_donut_links.js';
import dataDonutOutcomes from '../data/data_donut_outcomes.js';

// Policy
export var donutPolicy = makeDonutPolicy('#donutPolicy', 'Policy', dataDonutPolicy);
export var donutLinks = makeDonutPolicy('#donutLinks', 'Links', dataDonutLinksDefault);
export var donutOutcomes = makeDonutPolicy('#donutOutcomes','Outcomes',dataDonutOutcomes);
