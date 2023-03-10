export default class FormView {
  constructor() {
    this.modalBtn = document.querySelectorAll('.modal-btn');
    this.modalCloseBtn = document.querySelectorAll('.close');
    this.modalbg = document.querySelector('.bground');
    this.formTextInputs = document.querySelectorAll('.text-control');
    this.locationsVals = document.getElementsByName('location');
    this.checkboxes = document.querySelectorAll('input[type=checkbox]');
    this.modalForm = document.getElementById('reserve');
    this.errorMessages = {
      invalid: 'Valeur incorrecte pour ce champ',
      required: 'Ce champ est requis',
    };
  }

  bindSubmitForm = (handler) => {
    this.modalForm.addEventListener('submit', (event) => {
      event.preventDefault();
      handler(this.formTextInputs, this.locationsVals, this.checkboxes);
    });
  };

  openForm = () => {
    this.modalBtn.forEach((btn) =>
      btn.addEventListener('click', () => {
        this.modalbg.style.display = 'block';
      })
    );
  };

  closeForm = () => {
    this.modalCloseBtn.forEach((btn) =>
      btn.addEventListener('click', () => {
        this.modalbg.style.display = 'none';
      })
    );
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
      if (input.type !== 'checkbox') {
        input.parentNode.setAttribute(
          'data-error-visible',
          `${!status.isValid}`
        );
        if (!status.isValid) {
          const message = status.isEmpty
            ? this.errorMessages.required
            : this.errorMessages.invalid;
          if (input.type === 'checkbox') {
            input.nextElementSibling.setAttribute('data-error', message);
          } else {
            input.parentNode.setAttribute('data-error', message);
          }
        }
      } else {
        this.displayCheckBoxStatus(input, status);
      }
    }
  };

  displayCheckBoxStatus = (checkbox, status) => {
    checkbox.nextElementSibling.setAttribute(
      'data-error-visible',
      `${!status.isValid}`
    );
    if (!status.isValid) {
      checkbox.nextElementSibling.setAttribute(
        'data-error',
        this.errorMessages.required
      );
    }
  };

  displayLocationStatus = (locationChoice) => {
    if (!locationChoice.isValid) {
      this.locationsVals[0].parentNode.setAttribute(
        'data-error-visible',
        'true'
      );
      this.locationsVals[0].parentNode.setAttribute('data-error', 'acthung');
    }
  };

  removeDataError = (input) => {
    input.parentNode.removeAttribute('data-error-visible');
  };
}
