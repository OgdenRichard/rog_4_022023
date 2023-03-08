export default class FormView {
  constructor() {
    this.modalBtn = document.querySelectorAll('.modal-btn');
    this.modalbg = document.querySelector('.bground');
    this.formTextInputs = document.querySelectorAll('.text-control');
    this.modalForm = document.getElementById('reserve');
  }

  openForm = () => {
    this.modalBtn.forEach((btn) =>
      btn.addEventListener('click', () => {
        this.modalbg.style.display = 'block';
      })
    );
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
        input.parentNode.setAttribute('data-error', status.message);
      }
    }
  };

  displayHighLight = (index, isValid, message) => {
    const errorous = !isValid;
    this.formTextInputs[index].parentNode.setAttribute(
      'data-error-visible',
      `${errorous}`
    );
    if (errorous) {
      this.formTextInputs[index].parentNode.setAttribute('data-error', message);
    }
  };

  removeDataError = (index) => {
    this.formTextInputs[index].parentNode.removeAttribute('data-error-visible');
  };
}
