import { dataGrid } from '../data/data_grid.js';

// Definte Columns
const columnDefs = [
  {
    headerName: 'Link',
    field: 'link',
    width:120,
    cellRenderer: function (params) {
      let linkBar = `<div class = "linkCellContainer"> <div class = "linkCell ${params.data.link}">1</div></div> `;
      return linkBar;
    },
    
  },
  { headerName: 'Paper', field: 'title' },
  { headerName: 'Policy Sector', field: 'policy_group' },
  { headerName: 'Policy', field: 'policy' },
  { headerName: 'Health Outcome', field: 'outcome' },
];


// let the grid know which columns and what data to use
const gridOptions = {
  columnDefs: columnDefs,
  animateRows: true,
  defaultColDef: {
    filter: 'agSetColumnFilter',
    filterParams: {
      buttons: ['reset'],
      debounceMs: 100,
      filterOptions: ['contains'],
      suppressAndOrCondition: true,
    },
  },
  rowData: dataGrid,
  onGridReady(params) {
    params.api.sizeColumnsToFit();
  },
  isExternalFilterPresent: isExternalFilterPresent,
  doesExternalFilterPass: doesExternalFilterPass
};

var filterState = "none";

function externalFilterChanged(newValue) {
  filterState = newValue;
  console.table(filterState);
  gridOptions.api.onFilterChanged();
}

function isExternalFilterPresent() {
  // if ageType is not noFilter, then we are filtering
  return filterState !== 'none';
}

window.policy = 'All';
window.outcome = 'All';

function doesExternalFilterPass(node) {
  if (filterState === 'none') {
    return true;
  } else if (window.policy === 'All' && window.outcome === 'All') {
    return true;
  } else if (window.policy !== 'All' && window.outcome !== 'All') {
    return (
      node.data.policy_group === window.policy &&
      node.data.outcome === window.outcome
    );
  } else if (window.policy !== 'All' && window.outcome === 'All') {
    return node.data.policy_group === window.policy;
  } else if (window.policy === 'All' && window.outcome !== 'All') {
    return node.data.outcome === window.outcome;
  }
  
}


// create the grid passing in the div to use together with the columns & data we want to use
let gridDiv = document.querySelector('#myGrid');
new agGrid.Grid(gridDiv, gridOptions);

export const updateGrid = function (newValue) {
  console.log("UDPATE GRID. Filter state:");
  externalFilterChanged(newValue);
};


function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
}