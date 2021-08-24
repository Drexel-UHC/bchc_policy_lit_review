export const fitlerRowElement = document.querySelector('.filterRowContainer');
export const placeHolder = fitlerRowElement.querySelector('#placeholder');
export const clearAllFilters = function () {
  console.log('clearAllFilters()');
};
import * as donuts from './donuts.js';

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
  fitlerRowElement.lastElementChild.addEventListener('click', function () {
    console.log('CLICKED CLEAR ALL');
    console.log(donuts.donutPolicy.series[0]);
    donuts.donutPolicy.series[0].points.forEach((element) => {
      element.state = "";
      element.selected = false;
         console.log(`reset data for ${element.name}`);
    }
    );

    donuts.donutPolicy.redraw();
            console.log('after redraw');

  });
};

export const clearFilterRow = function (id) {
  // Remove current filter
  console.log('clearFilterRow()');
  const existing_filterHTML = fitlerRowElement.querySelector(`.${id}`);
  if (existing_filterHTML) {
    existing_filterHTML.remove();
  }
  console.log(fitlerRowElement);

  // Add placeholder if needed
  if (fitlerRowElement.childElementCount === 2) {
    fitlerRowElement.removeChild(
      fitlerRowElement.querySelector('#clearAllBtn')
    );
    placeHolder.style.display = 'inline';
  }
};
