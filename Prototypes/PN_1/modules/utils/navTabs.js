export const tabButtons = document
  .querySelector('.app_container')
  .querySelectorAll('[role="tabButton"]');
const tabPanels = Array.from(
  document
    .querySelector('.app_container')
    .querySelectorAll('[role="tabContent"]')
);

export function handleTabClick(event) {
  console.log('CCLICKED SEMANTIC BUTTON!');
  // hide all tab panels
  tabPanels.forEach((panel) => {
    panel.hidden = true;
  });

  // mark all tabs as unselected
  tabButtons.forEach((tab) => {
    // tab.ariaSelected = false;
    console.log('unselect');
    console.log(tab);
    tab.classList.remove('active');
    tab.classList.add('inactive');
  });
  // mark the clicked tab as selected
  event.currentTarget.classList.add('active');
  event.currentTarget.classList.remove('inactive');
  // find the associated tabPanel and show it!
  const { id } = event.currentTarget;

  /*
    METHOD 1
  const tabPanel = tabs.querySelector(`[aria-labelledby="${id}"]`);
  console.log(tabPanel);
  tabPanel.hidden = false;
  */

  // METHOD 2 - find in the array of tabPanels
  console.log(tabPanels);
  const tabPanel = tabPanels.find(
    (panel) => panel.getAttribute('aria-labelledby') === id
  );
  tabPanel.hidden = false;
}


