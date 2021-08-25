import * as donuts from './donuts.js';
import {animateCountTo } from './donuts_count_animator.js';
import { fitlerRowElement, placeHolder } from './dounts_elements.js';

export const handleClearAll = function () {
  resetDonuts();
  resetFilterRow();
  animateCountTo('donutPolicy', 122);
  animateCountTo('donutOutcomes', 122);
};

const resetDonuts = function () {
  try {
    donuts.donutPolicy.getSelectedPoints()[0].select(false);
  } catch (error) {}
  try {
    donuts.donutOutcomes.getSelectedPoints()[0].select(false);
  } catch (error) {}
};

const resetFilterRow = function () {
  Array.from(fitlerRowElement.children).forEach((element) => {
    if (element.id !== '') {
      fitlerRowElement.removeChild(element);
    }
  });
  placeHolder.style.display = 'inline';
};