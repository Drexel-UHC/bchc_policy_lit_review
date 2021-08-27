import { animateCountTo } from './donuts_count_animator.js';
import { fitlerRowElement, placeHolder } from './dounts_elements.js';



  


export const deselectFilterRow = function (id) {
  // Remove current filter
  const existing_filterHTML = fitlerRowElement.querySelector(`.${id}`);
  if (existing_filterHTML) {
    existing_filterHTML.remove();
  }

  // Add placeholder if needed
  if (fitlerRowElement.childElementCount === 2) {
    fitlerRowElement.removeChild(
      fitlerRowElement.querySelector('#clearAllBtn')
    );
    placeHolder.style.display = 'inline';
  }
};


