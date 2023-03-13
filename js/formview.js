export default class FormView {
  constructor() {
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
      required: 'Ce champ est requis',
      nochoice: 'Vous devez choisir un tournoi',
      termsofuse: 'Vous devez accepter les CGU',
    };
  }

  bindSubmitForm = (handler) => {
    this.modalForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.formIsValid = true;
      handler(this.formTextInputs, this.locationsVals, this.checkboxes);
      if (this.formIsValid) {
        this.modalForm.submit();
        // TODO vider le local storage
        // TODO clear form / clear data attributes
        // TODO restaurer modalForm on close hors submit
        this.setCompletionModal();
      }
    });
  };

  setCompletionModal = () => {
    const formHeight = this.modalForm.offsetHeight;
    const formBtn = this.modalForm
      .querySelector('input[type=submit]')
      .cloneNode();
    formBtn.type = 'button';
    const btnHeight = formBtn.offsetHeight;
    formBtn.value = 'Fermer';
    formBtn.type = 'button';
    const completionText = document.createElement('div');
    completionText.innerText = 'Merci pour votre inscription';
    completionText.style.height = `${formHeight - btnHeight}px`;
    const completionForm = this.modalForm.cloneNode();
    completionForm.style.visibility = 'visible';
    completionForm.id = 'completion';
    completionForm.innerHTML = '';
    this.modalBody.innerHTML = '';
    this.modalBody.appendChild(completionForm);
    completionForm.appendChild(completionText);
    completionForm.appendChild(formBtn);
    formBtn.addEventListener('click', () => {
      this.modalbg.style.display = 'none';
      this.modalBody.innerHTML = '';
      this.formTextInputs.forEach((input) => {
        input.value = '';
      });
      this.modalBody.appendChild(this.modalForm);
    });
    // TODO clear & refill form on close btn or esc
  };

  openForm = () => {
    this.modalBtn.forEach((btn) =>
      btn.addEventListener('click', () => {
        this.modalbg.style.display = 'block';
      })
    );
  };

  closeForm = () => {
    this.modalCloseBtn.addEventListener('click', () => {
      this.modalbg.style.display = 'none';
    });
    document.addEventListener('keydown', ({ key }) => {
      if (key === 'Escape') {
        this.modalbg.style.display = 'none';
      }
    });
  };

  clearInputError = () => {
    this.formTextInputs.forEach((input) => {
      input.addEventListener('keyup', () => {
        this.removeDataError(input);
      });
    });
  };

  displayInputStatus = (input, status) => {
    if (input) {
      switch (status.type) {
        case 'text':
          this.displayTextStatus(input, status);
          break;
        case 'checkbox':
          this.displayCheckBoxStatus(input, status);
          break;
        case 'radio':
          this.displayLocationStatus(input, status);
          break;
        default:
          break;
      }
    }
  };

  displayTextStatus = (input, status) => {
    input.parentNode.setAttribute('data-error-visible', `${!status.isValid}`);
    if (!status.isValid) {
      this.formIsValid = false;
      const message = status.isEmpty
        ? this.errorMessages.required
        : this.errorMessages.invalid;
      input.parentNode.setAttribute('data-error', message);
    }
  };

  // TODO corriger margin
  displayCheckBoxStatus = (checkbox, status) => {
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

  // TODO : regrouper avec traitement text inputs
  displayLocationStatus = (radio, locationChoice) => {
    radio.parentNode.setAttribute(
      'data-error-visible',
      `${!locationChoice.isValid}`
    );
    if (!locationChoice.isValid) {
      this.formIsValid = false;
      radio.parentNode.setAttribute('data-error-visible', 'true');
      radio.parentNode.setAttribute('data-error', this.errorMessages.nochoice);
    }
  };

  removeDataError = (input) => {
    input.parentNode.removeAttribute('data-error-visible');
  };
}
