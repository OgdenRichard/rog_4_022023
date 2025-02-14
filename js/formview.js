export default class FormView {
  /**
   * @constructor
   */
  constructor() {
    this.navbarBtn = document.getElementById('navbar-menu');
    this.topNav = document.getElementById('myTopnav');
    this.dropDown = document.getElementById('dropdown');
    this.modalBtn = document.querySelectorAll('.modal-btn');
    this.modalCloseBtn = document.getElementById('form-close');
    this.modalbg = document.querySelector('.bground');
    this.formTextInputs = document.querySelectorAll('.text-control');
    this.locationsVals = document.getElementsByName('location');
    this.checkboxes = document.querySelectorAll('input[type=checkbox]');
    this.modalBody = document.querySelector('.modal-body');
    this.modalForm = document.getElementById('reserve');
    this.errorMessages = {
      invalid: 'Valeur incorrecte pour ce champ',
      wrongname:
        'Ponctuation, tirets, chiffres et caractères spéciaux interdits',
      wrongemail: 'Veuillez saisir un email valide',
      wrongage: 'Vous devez avoir entre 7 et 77 ans pour participer',
      wrongnumber: 'Veuillez choisir un nombre compris entre 0 et 10',
      required: 'Ce champ est requis',
      nochoice: 'Vous devez choisir un tournoi',
      termsofuse: 'Vous devez accepter les CGU',
    };
    // initialization
    this.displayDropdown();
    this.displayActiveNavElement();
    this.clearInputError();
    this.beforeUnload();
  }

  // ----------------------------- navbar management ----------------------------- //

  /**
   * Displays / collapses navbar drowpdown
   */
  displayDropdown = () => {
    this.navbarBtn.addEventListener('click', () => {
      if (this.topNav.className === 'topnav') {
        this.topNav.className += ' responsive';
      } else {
        this.topNav.className = 'topnav';
      }
    });
  };

  /**
   * Changes active nav link on click
   */
  displayActiveNavElement = () => {
    const dropdownElements = this.dropDown.getElementsByTagName('a');
    for (let index = 0; index < dropdownElements.length; index += 1) {
      dropdownElements[index].addEventListener('click', () => {
        this.dropDown.querySelector('.active').classList.remove('active');
        dropdownElements[index].className = 'active';
      });
    }
  };

  // ----------------------------- modal management ----------------------------- //

  /**
   * Sends every input to FormModel for validation
   * Closes form and opens completion modal if all fields are ok
   * @param {callback} handler
   */
  bindSubmitForm = (handler) => {
    this.modalForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.formIsValid = true;
      handler(this.formTextInputs, this.locationsVals, this.checkboxes);
      if (this.formIsValid) {
        this.onValidForm();
        this.setCompletionModal();
      }
    });
  };

  /**
   * Closes form and checks inputs values
   * Values are saved in Local storage whether ok or not
   * @param {callback} handler
   */
  bindCloseForm = (handler) => {
    this.modalCloseBtn.addEventListener('click', () => {
      this.modalbg.style.display = 'none';
      this.formIsValid = true;
      handler(this.formTextInputs, this.locationsVals, this.checkboxes);
    });
    document.addEventListener('keydown', ({ key }) => {
      if (key === 'Escape') {
        this.modalbg.style.display = 'none';
        this.formIsValid = true;
        handler(this.formTextInputs, this.locationsVals, this.checkboxes);
      }
    });
  };

  /**
   * Opens form and loads input values
   * @param {callback} handler
   */
  bindOpenForm = (handler) => {
    this.modalBtn.forEach((btn) =>
      btn.addEventListener('click', () => {
        this.topNav.className = 'topnav';
        handler();
        this.restoreForm();
        this.modalbg.style.display = 'block';
      })
    );
  };

  /**
   * Clears local storage if form is valid
   * Calls FormModel method through FormController
   * @param {callback} handler
   */
  bindClearLocalStorage = (callback) => {
    this.onValidForm = callback;
  };

  /**
   * Clears local storage on close tab or page reload
   * @param {callback} handler
   */
  bindOnUnload = (handler) => {
    window.addEventListener('unload', () => {
      handler();
    });
  };

  /**
   * Displays navigator alert before close tab or page reload
   * @param {callback} handler
   */
  beforeUnload = () => {
    window.addEventListener('beforeunload', (event) => {
      event.preventDefault();
      event.returnValue = '';
    });
  };

  /**
   * Fills form with values from Local storage
   * @param {Array} inputValuesStatus
   */
  fillForm = (inputValuesStatus) => {
    inputValuesStatus.forEach((status) => {
      this.displayInputStatus(status);
    });
  };

  /**
   * Restores empty form after completion
   */
  restoreForm = () => {
    if (!document.getElementById('reserve')) {
      this.modalBody.innerHTML = '';
      this.modalBody.appendChild(this.modalForm);
      this.clearForm();
    }
  };

  /**
   * Wipes out old input values from form
   */
  clearForm = () => {
    this.formTextInputs.forEach((input) => {
      input.value = input.type === 'number' ? '0' : '';
      this.removeDataError(input);
    });
    this.locationsVals.forEach((radio) => {
      radio.checked = false;
      this.removeDataError(radio);
    });
    this.removeDataError(document.getElementById('checkbox1'));
    document.getElementById('checkbox2').checked = false;
  };

  /**
   * Clear error messages and error display
   */
  clearInputError = () => {
    this.formTextInputs.forEach((input) => {
      input.addEventListener('keyup', () => {
        this.removeDataError(input);
      });
    });
    this.formTextInputs.forEach((input) => {
      input.addEventListener('change', () => {
        this.removeDataError(input);
      });
    });
    this.locationsVals.forEach((input) => {
      input.addEventListener('change', () => {
        this.removeDataError(input);
      });
    });
    this.checkboxes.forEach((input) => {
      input.addEventListener('change', () => {
        this.removeDataError(input);
      });
    });
  };

  /**
   * Displays input status and error message if necessary
   * @param {{}} status
   */
  displayInputStatus = (status) => {
    if (status) {
      switch (status.type) {
        case 'text':
          this.displayTextStatus(status);
          break;
        case 'checkbox':
          this.displayCheckBoxStatus(status);
          break;
        case 'radio':
          this.displayLocationStatus(status);
          break;
        default:
          break;
      }
    }
  };

  /**
   * Handles text inputs
   * @param {{}} status
   */
  displayTextStatus = (status) => {
    const input = document.getElementById(status.id);
    input.value = status.value;
    input.parentNode.setAttribute('data-error-visible', `${!status.isValid}`);
    if (!status.isValid) {
      this.formIsValid = false;
      const message = status.isEmpty
        ? this.errorMessages.required
        : this.setErrorMessage(status.id);
      input.parentNode.setAttribute('data-error', message);
    }
  };

  /**
   * Handles radio inputs
   * @param {{}} status
   */
  displayLocationStatus = (status) => {
    const radio = document.getElementById(status.id);
    radio.parentNode.setAttribute('data-error-visible', `${!status.isValid}`);
    if (!status.isValid) {
      this.formIsValid = false;
      radio.parentNode.setAttribute('data-error', this.errorMessages.nochoice);
    } else {
      radio.checked = true;
    }
  };

  /**
   * Handles checkbox inputs
   * @param {{}} status
   */
  displayCheckBoxStatus = (status) => {
    const checkbox = document.getElementById(status.id);
    checkbox.checked = status.checked;
    checkbox.nextElementSibling.setAttribute(
      'data-error-visible',
      `${!status.isValid}`
    );
    if (!status.isValid) {
      this.formIsValid = false;
      checkbox.nextElementSibling.setAttribute(
        'data-error',
        this.errorMessages.termsofuse
      );
    }
  };

  /**
   * Manages specific error messages
   * @param {string} id
   * @returns {string}
   */
  setErrorMessage = (id) => {
    let message = '';
    switch (id) {
      case 'first':
        message = this.errorMessages.wrongname;
        break;
      case 'last':
        message = this.errorMessages.wrongname;
        break;
      case 'email':
        message = this.errorMessages.wrongemail;
        break;
      case 'birthdate':
        message = this.errorMessages.wrongage;
        break;
      case 'quantity':
        message = this.errorMessages.wrongnumber;
        break;
      default:
        message = this.errorMessages.invalid;
        break;
    }
    return message;
  };

  /**
   * Clears error display
   * @param {HTMLElement} input
   */
  removeDataError = (input) => {
    if (input.type !== 'checkbox') {
      input.parentNode.removeAttribute('data-error-visible');
      input.parentNode.removeAttribute('data-error');
    } else {
      input.nextElementSibling.removeAttribute('data-error-visible');
      input.nextElementSibling.removeAttribute('data-error');
    }
  };

  /**
   * Builds completion modal after form validation
   */
  setCompletionModal = () => {
    const formBtn = this.modalForm
      .querySelector('input[type=submit]')
      .cloneNode();
    const formHeight = this.modalForm.offsetHeight;
    const btnHeight = formBtn.offsetHeight;
    const completionDiv = document.createElement('div');
    const completionText = document.createElement('p');
    const completionForm = this.modalForm.cloneNode();
    formBtn.value = 'Fermer';
    completionDiv.style.height = `${formHeight - btnHeight}px`;
    completionDiv.className = 'completion__txt';
    completionText.innerText = 'Merci pour votre inscription';
    completionForm.id = 'completion';
    completionForm.innerHTML = '';
    this.modalBody.innerHTML = '';
    this.modalBody.appendChild(completionForm);
    completionForm.appendChild(completionDiv);
    completionDiv.appendChild(completionText);
    completionForm.appendChild(formBtn);
    completionForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.modalbg.style.display = 'none';
      this.restoreForm();
    });
  };
}
