/* eslint-disable import/extensions */
import FormView from './modalview.js';

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
}

// TODO appeler les méthodes de vérif de dates dans une méthode et gérer l'affichage du message
// saisir une date, saisir une date antérieure à la date du jour / tournoi ouvert de 7 à 77 ans

function checkNbOfTournaments(strNumber) {
  // TODO function isNaN
  return parseInt(strNumber, 10);
}

function displayValidHighLight(input) {
  input.parentNode.setAttribute('data-error-visible', 'false');
}

function checkEmptyTextField(input) {
  if (input.type !== 'number') {
    return input.value.length;
  }
}

// TODO function checkLocation

// TODO function setErrorDisplay

// TODO gérer local storage
// TODO JS Doc

function validateForm() {
  for (let i = 0, len = formTextInputs.length; i < len; i += 1) {
    switch (formTextInputs[i].type) {
      case 'text':
        // TODO : extraire fW?
        fW.displayHighLight(
          i,
          checkInputVal(formTextInputs[i].value, namesPattern),
          'oh nooooooooooo'
        );
        console.log(
          `champs de type ${formTextInputs[i].name} name : ${checkInputVal(
            formTextInputs[i].value,
            namesPattern
          )}`
        );
        break;
      case 'email':
        console.log(
          `champs de type email : ${checkInputVal(
            formTextInputs[i].value,
            emailPattern
          )}`
        );
        break;
      case 'date':
        console.log(
          `champs de type date : ${checkAge(
            checkDate(formTextInputs[i].value)
          )}`
        );
        break;
      case 'number':
        console.log(
          `champs de type number : ${checkNbOfTournaments(
            formTextInputs[i].value
          )}`
        );
        console.log(formTextInputs[i].value.length);
        break;
      default:
        console.log('champs de type inconnu ou type non précisé');
    }
  }
  locationVals.forEach((location) => {
    // TODO : counter
    if (location.checked) {
      console.log(location.value);
    } else {
      console.log('Location not selected');
    }
  });
}

class FormDisplay {
  // set data elements
  static displayHighLight = (input, isValid, message) => {
    const errorous = !isValid;
    input.parentNode.setAttribute('data-error-visible', `${errorous}`);
    if (errorous) {
      input.parentNode.setAttribute('data-error', message);
    }
  };

  // remove data element
  static removeDataError = (input) => {
    input.parentNode.removeAttribute('data-error-visible');
  };

  // display message
  static displayErrorMessage = (input, message) => {
    input.parentNode.setAttribute('data-error', message);
  };
}

const FormController = () => {
  const testo = new FormDisplay();
  // open modal
 /*  modalBtn.forEach((btn) =>
    btn.addEventListener('click', () => {
      modalbg.style.display = 'block';
    })
  ); */
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
  // reset data attribute on user action
  formTextInputs.forEach((input) => {
    input.addEventListener('keyup', () => {
      FormDisplay.removeDataError(input);
      // input.parentNode.removeAttribute('data-error-visible');
    });
  });
};

FormController();
const fW = new FormView();
fW.openForm();
fW.bindSubmitForm(validateForm);
//checkUserData();
//validateForm();
