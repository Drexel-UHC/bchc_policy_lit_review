// Import Modules
import { auth_form, authHandler } from './modules/utils/auth.js';
import { tabButtons, handleTabClick } from './modules/utils/navTabs.js';
import { donutPolicy, donutLinks, donutOutcomes} from './modules/donuts/donuts.js';

// Import Data
import {
  dataDonutPolicy,
  dataDonutPolicyFill,
} from './modules/data/data_donut_policy.js';


console.table(dataDonutPolicy);
console.log(dataDonutPolicyFill);

// Add Event Listeners;
auth_form.addEventListener('submit', authHandler);
tabButtons.forEach((button) => button.addEventListener('click', handleTabClick));

