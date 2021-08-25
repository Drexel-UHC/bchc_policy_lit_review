import * as donuts from './donuts.js';
import { animateCountTo } from './donuts_count_animator.js';

export const handleDeselect = function (id) {
  // Remove current filter
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
