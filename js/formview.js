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
      wrongnumber: 'Veuillez choisir un nombre compris entre 0 et 10',
      wrongage: 'Vous devez avoir entre 7 et 77 ans pour participer',
      required: 'Ce champ est requis',
      nochoice: 'Vous devez choisir un tournoi',
      termsofuse: 'Vous devez accepter les CGU',
    };
    // initialization
    this.displayDropdown();
    this.displayActiveNavElement();
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
   *
   * @param {callback} handler
   *
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
   *
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
   *
   * @param {callback} handler
   */
  bindClearLocalStorage = (callback) => {
    this.onValidForm = callback;
  };

  /**
   *
   * @param {Array} inputValuesStatus
   */
  fillForm = (inputValuesStatus) => {
    inputValuesStatus.forEach((status) => {
      this.displayInputStatus(status);
    });
  };

  /**
   *
   */
  restoreForm = () => {
    if (!document.getElementById('reserve')) {
      this.modalBody.innerHTML = '';
      this.modalBody.appendChild(this.modalForm);
      this.clearForm();
    }
  };

  /**
   *
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
   *
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
   *
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
   *
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
   *
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
   *
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
   *
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
   *
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
   *
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
