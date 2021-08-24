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
};
// create the grid passing in the div to use together with the columns & data we want to use
new agGrid.Grid(document.querySelector('#myGrid'), gridOptions);
