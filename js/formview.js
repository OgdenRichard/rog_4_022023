export default class FormView {
  constructor() {
    this.modalBtn = document.querySelectorAll('.modal-btn');
    this.modalCloseBtn = document.querySelectorAll('.close');
    this.modalbg = document.querySelector('.bground');
    this.formTextInputs = document.querySelectorAll('.text-control');
    this.modalForm = document.getElementById('reserve');
    // messages
    this.errorMessages = {
      invalid: 'Valeur incorrecte pour ce champ',
      required: 'Ce champ est requis',
    };
  }

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
    // reset data attribute on user action
    this.formTextInputs.forEach((input) => {
      input.addEventListener('keyup', () => {
        this.removeDataError(input);
      });
    });
  };

  bindSubmitForm = (handler) => {
    this.modalForm.addEventListener('submit', (event) => {
      event.preventDefault();
      handler(this.formTextInputs);
    });
  };

  displayInputStatus = (input, status) => {
    if (input) {
      input.parentNode.setAttribute('data-error-visible', `${!status.isValid}`);
      if (!status.isValid) {
        const message = status.isEmpty
          ? this.errorMessages.required
          : this.errorMessages.invalid;
        input.parentNode.setAttribute('data-error', message);
      }
    }
  };

  removeDataError = (input) => {
    input.parentNode.removeAttribute('data-error-visible');
  };
}
