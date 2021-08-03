function formSubmit(event) {
  console.log(`Submit clicked; ${passwordUHC.value}`);
  if ( passwordUHC.value === "uhc") {
    console.log(`Correct`);
    document.querySelector('#prototype').style.display = 'block';
    document.querySelector('#form').style.display = 'none';
  } else {
      console.log(`INCORRECT`);
  }
  event.preventDefault();
}



const form = document.getElementById('form');
const log = document.getElementById('log');
const userName = document.getElementById('userName');
const passwordUHC = document.getElementById('passwordUHC');
form.addEventListener('submit', formSubmit);