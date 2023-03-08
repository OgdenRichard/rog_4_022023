/* eslint-disable import/extensions */
import FormView from './formview.js';
import FormModel from './formmodel.js';

export default class FormController {
  constructor() {
    this.model = new FormModel();
    this.view = new FormView();
  }

  changeInputStatus = (input, inputStatus) => {
    this.view.displayInputStatus(input, inputStatus);
  };

  runForm = () => {
    this.model.bindNewInputStatus(this.changeInputStatus);
    this.view.openForm();
    this.view.closeForm();
    this.view.clearInputError();
    this.view.bindSubmitForm(this.model.addinputStatus);
  };

  handleInput = (input) => {
    this.model.addInputValue(input);
  };
}
