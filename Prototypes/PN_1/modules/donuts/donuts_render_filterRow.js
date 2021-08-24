export const fitlerRowElement = document.querySelector('.filterRowContainer');
export const placeHolder = fitlerRowElement.querySelector('#placeholder');
export const renderFilterRow = function (thiss,id) {
  // Remove place-holder text
  placeHolder.style.display = 'none';
  // Remove previous filter of same class
  const existing_filterHTML = fitlerRowElement.querySelector(`.${id}`);
  if (existing_filterHTML) {
    existing_filterHTML.remove();
  }
  // Create Filter HTML
  var myHTML = `
  <div class="filterHTML ${id}" id = "filterHTML_${thiss.name}" style = " border-bottom-color: ${thiss.color};" >
    ${thiss.name} <i class="fas fa-times-circle cancleFilterBtn"></i>
  </div>
`;
  // Append to DOM
  const myFragment = document.createRange().createContextualFragment(myHTML);
  fitlerRowElement.appendChild(myFragment);
};
