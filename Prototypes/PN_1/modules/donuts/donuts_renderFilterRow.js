import { handleClearAll } from './donuts_handleClearAll.js';
import { handleDeselect } from './donuts_handleDeselect.js';
import { animateCountTo } from './donuts_count_animator.js';
import * as donuts from './donuts.js';
import { fitlerRowElement, placeHolder } from './dounts_elements.js';

export const renderFilterRow = function (thiss, id) {
  deleteExistingFilterTab(id);
  updateFilterRowText();
  insertNewFilterTab(thiss, id);
  updateGlobalVariables(thiss, id);
  insertClearAllBtn();
};


const deleteExistingFilterTab = function (id) {
  const existing_filterHTML = fitlerRowElement.querySelector(`.${id}`);
  if (existing_filterHTML) {
    existing_filterHTML.remove();
  }
};

const updateFilterRowText = function () {
  placeHolder.style.display = 'none';
  if (fitlerRowElement.lastElementChild.id === 'clearAllBtn') {
    fitlerRowElement.removeChild(
      fitlerRowElement.querySelector('#clearAllBtn')
    );
  }
};

const insertNewFilterTab = function (thiss, id) {
  var filterHTML = `<div class="filterHTML ${id}" id = "filterHTML_${thiss.name}" style = " border-bottom-color: ${thiss.color};" >${thiss.name} <i class="fas fa-times-circle cancleFilterBtn"></i> </div>`;
  const fitlerFragment = document
    .createRange()
    .createContextualFragment(filterHTML);
  fitlerRowElement.appendChild(fitlerFragment);
};

const updateGlobalVariables = function (thiss, id) {
  if (id === 'donutPolicy') {
    window.policy = thiss.name;
  } else {
    window.outcome = thiss.name;
  }
};

const insertClearAllBtn = function () {
  var clearHTML = `<button id = "clearAllBtn"> clear all </button>`;
  const clearFragment = document
    .createRange()
    .createContextualFragment(clearHTML);
  fitlerRowElement.appendChild(clearFragment);
  // Add listener
  fitlerRowElement.lastElementChild.addEventListener('click', handleClearAll);
};

