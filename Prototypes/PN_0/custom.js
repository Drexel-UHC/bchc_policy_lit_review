function formSubmit(event) {
  console.log(`Submit clicked; ${userName.value} ${passwordUHC.value}`);
  if (userName.value === "uhc" && passwordUHC.value === "uhc") {
    console.log(`Correct`);
    document.querySelector('#prototype').style.display = 'block';
    document.querySelector('#form').style.display = 'none';
  } else {
      console.log(`INCORRECT`);
  }
  event.preventDefault();
}

function myFunction() {
  var x = document.getElementById('passwordUHC');
  if (x.type === 'password') {
    x.type = 'text';
  } else {
    x.type = 'password';
  }
}

const form = document.getElementById('form');
const log = document.getElementById('log');
const userName = document.getElementById('userName');
const passwordUHC = document.getElementById('passwordUHC');
form.addEventListener('submit', formSubmit);