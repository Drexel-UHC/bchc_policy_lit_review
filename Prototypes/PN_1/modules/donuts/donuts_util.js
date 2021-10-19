import { dataDonutPolicy } from '../data/data_donut_policy.js';
import {
  dataDonutLinksDefault,
  dataDonutLinks,
  dataDonutLinksTotal,
} from '../data/data_donut_links.js';
import { dataDonutOutcomes } from '../data/data_donut_outcomes.js';
import * as donuts from './donuts.js';
import { animateCountTo } from './donuts_count_animator.js';



export const numPolicies = dataDonutPolicy.length;
export const numOutcomes = dataDonutOutcomes.length;

export const consoleLogGlobals = function () {
  console.log(`Global Vars: ${window.policy}, ${window.outcome}`);
};

export const updateGlobalVariables = function (id, newValue) {
  if (id === 'donutPolicy') {
    window.policy = newValue;
  } else {
    window.outcome = newValue;
  }
};

export const deselectDonut = function (id) {
  const chart =
    id === 'donutPolicy' ? donuts.donutPolicy : donuts.donutOutcomes;
  try {
    chart.getSelectedPoints()[0].select(false);
  } catch (error) {
    console.log('NOPE');
  }
};

export const makeTitle = function (id, data) {
  if (id == 'donutPolicy') {
    return `<div><span class="donutTitleBigFont" id = "${id}Counter">${data.length}</span><br><span class = "donutTitleSmallFont">Policies</span> </div>`;
  } else if (id == 'donutLinks') {
    return `<div><span class="donutTitleBigFont" id = "${id}Counter">${data.reduce(
      linkReducer,
      0
    )}</span><br><span class = "donutTitleSmallFont">Links</span> </div>`;
  } else {
    return `<div><span class="donutTitleBigFont" id = "${id}Counter">${data.length}</span><br><span class = "donutTitleSmallFont">Outcomes</span> </div>`;
  }
};
const linkReducer = (total, i) => total + i[1];

export const cleanStr = function (str) {
  const result = str.replace(/[^A-Z0-9]/gi, '_');
  return result;
};

export const updateOpacityInactivePoints = function (id, selector, opacity) {
  const otherPoints = document
    .querySelector(`#${id}`)
    .querySelectorAll(`.${selector}`);
  otherPoints.forEach((element) => {
    element.style.opacity = opacity;
  });
};

export const updateLinksDonut = function () {
  /// Get Number of Links based on global variables
  const filteredData = dataDonutLinks
      .filter((row) => row.policyGroup === window.policy)
      .filter((row) => row.outcome === window.outcome);
  const negativeLinks = reduceLinks(filteredData, 'Negative');
  const positiveLinks = reduceLinks(filteredData, 'Positive');
  const totalLinks = positiveLinks + negativeLinks;
  const nullLinks = dataDonutLinksTotal - positiveLinks - negativeLinks;
  console.log(dataDonutLinksTotal);
  console.log(
    `pos/neg/total/null links: ${positiveLinks} / ${negativeLinks} /${totalLinks}/${nullLinks}`
  );
  /// Update Link Donut Title 
  animateCountTo('donutLinks', totalLinks);
};



const reduceLinks = (filteredData, direction) => {
  const data = filteredData.filter((row) => row.link === direction);
  return Object.keys(data).reduce(function (previous, key) {
    return previous + data[key].n;
  }, 0);
};

 