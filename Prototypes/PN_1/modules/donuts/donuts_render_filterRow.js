import * as donuts from './donuts.js';
import {
  animationDuration,
  frameDuration,
  totalFrames,
  animateCountTo,
} from './donuts_count_animator.js';

export const fitlerRowElement = document.querySelector('.filterRowContainer');
export const placeHolder = fitlerRowElement.querySelector('#placeholder');

export const renderFilterRow = function (thiss, id) {
  // Remove place-holder text
  placeHolder.style.display = 'none';
  // Remove previous filter of same class
  const existing_filterHTML = fitlerRowElement.querySelector(`.${id}`);
  if (existing_filterHTML) {
    existing_filterHTML.remove();
  }
  // Remove clearAll if needed
  if (fitlerRowElement.lastElementChild.id === 'clearAllBtn') {
    fitlerRowElement.removeChild(
      fitlerRowElement.querySelector('#clearAllBtn')
    );
  }
  // Add filter to filterRow
  var filterHTML = `<div class="filterHTML ${id}" id = "filterHTML_${thiss.name}" style = " border-bottom-color: ${thiss.color};" >${thiss.name} <i class="fas fa-times-circle cancleFilterBtn"></i> </div>`;
  const fitlerFragment = document
    .createRange()
    .createContextualFragment(filterHTML);
  fitlerRowElement.appendChild(fitlerFragment);
  // Update global policy
  if (id === 'donutPolicy') {
    window.policy = thiss.name;
  } else {
    window.outcome = thiss.name;
  }
  // Add clear all filters button
  var clearHTML = `
  <button id = "clearAllBtn"> clear all </button>`;
  const clearFragment = document
    .createRange()
    .createContextualFragment(clearHTML);
  fitlerRowElement.appendChild(clearFragment);
  // Add listener
  fitlerRowElement.lastElementChild.addEventListener('click', clearAllFilters);
};

/////////////////////////////////////////////
export const clearFilterRow = function (id) {
  // Remove current filter
  const existing_filterHTML = fitlerRowElement.querySelector(`.${id}`);
  if (existing_filterHTML) {
    existing_filterHTML.remove();
  }
  console.log('clearFilterRow()');

  console.log(fitlerRowElement);

  // Add placeholder if needed
  if (fitlerRowElement.childElementCount === 2) {
    fitlerRowElement.removeChild(
      fitlerRowElement.querySelector('#clearAllBtn')
    );
    placeHolder.style.display = 'inline';
  }
};

export const clearAllFilters = function () {
  // Reset Donuts
  try {
    donuts.donutPolicy.getSelectedPoints()[0].select(false);
  } catch (error) {}
  try {
    donuts.donutOutcomes.getSelectedPoints()[0].select(false);
  } catch (error) {}
  // Reset Filter bar
  Array.from(fitlerRowElement.children).forEach((element) => {
    if (element.id !== '') {
      fitlerRowElement.removeChild(element);
    }
  });
  placeHolder.style.display = 'inline';
  // Reset Titles
  animateCountTo('donutPolicy', 122);
  animateCountTo('donutOutcomes', 122);
};
