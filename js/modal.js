function editNav() {
  const x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

// DOM Elements
const navbarBtn = document.querySelector('#navbar-menu');
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const formTextInputs = document.querySelectorAll('.text-control');
const locationVals = document.getElementsByName('location');
const modalForm = document.getElementById('reserve');
const modalCloseBtn = document.querySelectorAll('.close');
const formData = document.querySelectorAll('.formData');

// regex patterns
const namesPattern =
  /^(?=.{2,40}$)([A-Za-zÀ-ÖØ-öø-ÿ])+(?:[-'\s][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// launch navbar menu
navbarBtn.addEventListener('click', editNav);

// launch modal form
function launchModal() {
  modalbg.style.display = 'block';
}

// close modal form
function closeModal() {
  modalbg.style.display = 'none';
}

function checkUserData() {
  formTextInputs.forEach((data) => {
    data.addEventListener('keyup', () => {
      console.log(data.value);
    });
  });
}

function checkInputVal(inputVal, pattern) {
  return pattern.test(inputVal);
}

function checkDate(strDate) {
  const inputDate = new Date(strDate);
  const todayDate = new Date();
  if (!isNaN(inputDate.getTime()) && todayDate > inputDate) {
    const datesDiff = new Date(todayDate - inputDate);
    return datesDiff.getUTCFullYear() - 1970;
  }
}

function checkAge(ageVal) {
  // handle error message here
  if (ageVal) {
    return ageVal > 7 && ageVal < 77;
  }
  return 'prout';
}
// TODO appeler les méthodes de vérif de dates dans une méthode et gérer l'affichage du message
// saisir une date, saisir une date antérieure à la date du jour / tournoi ouvert de 7 à 77 ans

function checkNbOfTournaments(strNumber) {
  // TODO function isNaN
  return parseInt(strNumber, 10);
}

function displayErrorHighlight(input) {
  input.parentNode.setAttribute('data-error-visible', 'true');
  // switch/case again
  // dissocier valeur incorrecte vs/empty?
}

function displayValidHighLight(input) {
  input.parentNode.setAttribute('data-valid-field', 'true');
}

function displayErrorMessage() {}

function validateInput(input) {
  //border effect
}

// TODO function checkLocation

// TODO function setErrorDisplay

// TODO gérer local storage
// TODO JS Doc

function validateForm() {
  modalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formTextInputs.forEach((input) => {
      input.addEventListener('keyup', () => {
        input.parentNode.removeAttribute('data-error-visible');
      });
      switch (input.type) {
        case 'text':
          checkInputVal(input.value, namesPattern)
            ? displayValidHighLight(input)
            : displayErrorHighlight(input);

          console.log(
            `champs de type ${input.name} name : ${checkInputVal(
              input.value,
              namesPattern
            )}`
          );
          break;
        case 'email':
          console.log(
            `champs de type email : ${checkInputVal(input.value, emailPattern)}`
          );
          break;
        case 'date':
          console.log(
            `champs de type date : ${checkAge(checkDate(input.value))}`
          );
          break;
        case 'number':
          console.log(
            `champs de type number : ${checkNbOfTournaments(input.value)}`
          );
          break;
        default:
          console.log('champs de type inconnu ou type non précisé');
      }
      /* if (data.type === 'number' || data.type === 'date') {
        !data.value ? console.log('empty') : console.log(data.value);
      } else {
        console.log(data.value);
      } */
    });
    locationVals.forEach((location) => {
      if (location.checked) {
        console.log(location.value);
      } else {
        console.log('Location not selected');
      }
    });
  });
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// close modal
modalCloseBtn.forEach((btn) =>
  btn.addEventListener('click', () => {
    modalbg.style.display = 'none';
  })
);

// close modal on keypress esc
document.addEventListener('keydown', ({ key }) => {
  if (key === 'Escape') {
    modalbg.style.display = 'none';
  }
});

//checkUserData();
validateForm();
