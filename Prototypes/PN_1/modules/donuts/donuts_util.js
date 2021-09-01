import { dataDonutPolicy } from '../data/data_donut_policy.js';
import { dataDonutLinksDefault } from '../data/data_donut_links.js';
import { dataDonutOutcomes } from '../data/data_donut_outcomes.js';
import * as donuts from './donuts.js';
export const numPolicies = dataDonutPolicy.length;
export const numOutcomes = dataDonutOutcomes.length;

export const consoleLogGlobals = function () {
  console.log(
    `Global Vars: ${window.policy}, ${window.outcome}`
  );

};

export const updateGlobalVariables = function (id, newValue) {
  if (id === 'donutPolicy') {
    window.policy = newValue;
  } else {
    window.outcome = newValue;
  }
};

export const deselectDonut = function (id) {
  const chart = id === 'donutPolicy' ? donuts.donutPolicy : donuts.donutOutcomes;
  try {
    chart.getSelectedPoints()[0].select(false);
  } catch (error) {console.log("NOPE")}
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
  console.log(id);
  const otherPoints = document
    .querySelector(`#${id}`)
    .querySelectorAll(`.${selector}`);
  console.log(otherPoints);
  otherPoints.forEach((element) => {
    element.style.opacity = opacity;
  });
};
 

