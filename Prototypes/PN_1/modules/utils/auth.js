export const auth_form = document.getElementById('form');
const passwordUHC = document.getElementById('passwordUHC');

export function authHandler(event) {
  console.log(`Submit clicked; ${passwordUHC.value}`);
  if (passwordUHC.value === 'uhc') {
    document.querySelector('#app_container').style.display = 'block';
    document.querySelector('#form').style.display = 'none';
  } else {
    return;
  }
  event.preventDefault();
}
