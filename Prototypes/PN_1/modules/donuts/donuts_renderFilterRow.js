import { handleClearAll } from './donuts_handleClearAll.js';
import { animateCountTo } from './donuts_count_animator.js';
import {
  numOutcomes,
  numPolicies,
  deselectDonut,
  updateGlobalVariables,
  consoleLogGlobals,
  cleanStr,
  updateOpacityInactivePoints,
  updateLinksDonut
} from './donuts_util.js';
import { fitlerRowElement, placeHolder } from './dounts_elements.js';
import { resetFilterRow } from './donuts_handleClearAll.js';
import { updateGrid } from '../grid/grid.js';

export const renderFilterRow = function (thiss, id) {
  deleteExistingFilterTab(id);
  updateFilterRowTextSelect();
  insertNewFilterTab(thiss, id);
  insertClearAllBtn();
};

const deleteExistingFilterTab = function (id) {
  const existing_filterHTML = fitlerRowElement.querySelector(`.${id}`);
  if (existing_filterHTML) {
    existing_filterHTML.remove();
  }
};

const updateFilterRowTextDeselect = function () {
  const secondChild = Array.from(fitlerRowElement.children)[1];
  if (secondChild.id == 'clearAllBtn') {
    placeHolder.style.display = 'inline';
    secondChild.remove();
  }
};

const updateFilterRowTextSelect = function () {
  placeHolder.style.display = 'none';
  if (fitlerRowElement.lastElementChild.id === 'clearAllBtn') {
    fitlerRowElement.removeChild(
      fitlerRowElement.querySelector('#clearAllBtn')
    );
  }
};

const handleClearBtn = function () {
  const filterTab = event.path[1];
  const id = filterTab.classList[1];
  const defaultNum = id === 'donutPolicy' ? numPolicies : numOutcomes;
  deselectDonut(id);
  animateCountTo(id, defaultNum);
  updateGlobalVariables(id, 'All');
  filterTab.remove();
  consoleLogGlobals();
  updateFilterRowTextDeselect();
  updateOpacityInactivePoints(id, 'highcharts-point', 1);
  updateLinksDonut();
  updateGrid('filter');
};

const insertNewFilterTab = function (thiss, id) {
  const cleanName = cleanStr(thiss.name);
  // Append new filterTab to DOM
  var filterHTML = `<div class="filterHTML ${id}" id = "filterHTML_${cleanName}" style = " border-bottom-color: ${thiss.color};" >${thiss.name} <i class="fas fa-times-circle cancleFilterBtn"></i> </div>`;
  const fitlerFragment = document
    .createRange()
    .createContextualFragment(filterHTML);
  fitlerRowElement.appendChild(fitlerFragment);
  // Add event listener for closing
  fitlerRowElement
    .querySelector(`#filterHTML_${cleanName}`)
    .querySelector('.cancleFilterBtn')
    .addEventListener('click', handleClearBtn);
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
