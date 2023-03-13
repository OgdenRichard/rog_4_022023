/* eslint-disable import/extensions */
import FormView from './formview.js';
import FormModel from './formmodel.js';

export default class FormController {
  constructor() {
    this.model = new FormModel();
    this.view = new FormView();
  }

  setInputStatus = (inputStatus) => {
    this.view.displayInputStatus(inputStatus);
  };

  runForm = () => {
    this.view.openForm();
    this.view.closeForm();
    this.view.clearInputError();
    this.view.bindSubmitForm(this.model.addInputStatus);
    this.model.bindNewInputStatus(this.setInputStatus);
  };
}
