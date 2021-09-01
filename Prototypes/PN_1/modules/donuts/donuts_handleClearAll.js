import { dataDonutPolicy } from '../data/data_donut_policy.js';
import { dataDonutLinksDefault } from '../data/data_donut_links.js';
import { dataDonutOutcomes } from '../data/data_donut_outcomes.js';
import { fitlerRowElement, placeHolder } from './dounts_elements.js';
import { animateCountTo } from './donuts_count_animator.js';
import {
  deselectDonut,
  updateGlobalVariables,
  updateOpacityInactivePoints,
} from './donuts_util.js';

export const handleClearAll = function () {
  deselectDonut('donutPolicy');
  deselectDonut('donutOutcomes');
  resetFilterRow();
  animateCountTo('donutPolicy', dataDonutPolicy.length);
  animateCountTo('donutOutcomes', dataDonutOutcomes.length);
  updateGlobalVariables('donutPolicy', 'All');
  updateGlobalVariables('donutOutcomes', 'All');
  updateOpacityInactivePoints('donutPolicy','highcharts-point', 1);
  updateOpacityInactivePoints('donutOutcomes', 'highcharts-point', 1);
  console.log(`Global Vars: ${window.policy}, ${window.outcome}`);
};

export const resetFilterRow = function () {
  Array.from(fitlerRowElement.children).forEach((element) => {
    if (element.id !== '') {
      fitlerRowElement.removeChild(element);
    }
  });
  placeHolder.style.display = 'inline';
};
