// Import Modules
import { auth_form, authHandler } from './modules/utils/auth.js';
import { tabButtons, handleTabClick } from './modules/utils/navTabs.js';
import * as donuts from './modules/donuts/donuts.js';
//import * as grid from './modules/grid/grid.js';
// import * as policy from './modules/utils/policyHanders.js';



// HTML elements

// Auth/Navigation Event Listeners;
auth_form.addEventListener('submit', authHandler);
tabButtons.forEach((button) =>
  button.addEventListener('click', handleTabClick)
);

// Events for inputs
window.policy = 'All';
window.outcome = 'All';


