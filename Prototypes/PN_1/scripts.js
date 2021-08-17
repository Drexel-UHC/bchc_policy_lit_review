// Import Modules
import { auth_form, authHandler } from './modules/utils/auth.js';
import { tabButtons, handleTabClick } from './modules/utils/navTabs.js';
import { donutPolicy, donutPolicy2,donutPolicy3 } from './modules/donuts/donuts.js';


// Add Event Listeners
auth_form.addEventListener('submit', authHandler);
tabButtons.forEach((button) => button.addEventListener('click', handleTabClick));

