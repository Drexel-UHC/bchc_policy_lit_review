export const auth_form = document.getElementById('form');
const passwordUHC = document.getElementById('passwordUHC');

export function authHandler(event) {
  console.log(`Submit clicked; ${passwordUHC.value}`);
  if (passwordUHC.value === 'uhc') {
    console.log(`Correct`);
    document.querySelector('#app_container').style.display = 'block';
    document.querySelector('#form').style.display = 'none';
  } else {
    console.log(`INCORRECT`);
  }
  event.preventDefault();
}
