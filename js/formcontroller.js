/* eslint-disable import/extensions */
import FormView from './formview.js';
import FormModel from './formmodel.js';

export default class FormController {
  constructor() {
    this.model = new FormModel();
    this.view = new FormView();
  }

  setSingleInputStatus = (inputStatus) => {
    this.view.displayInputStatus(inputStatus);
  };

  setAllInputsStatus = (inputValuesStatus) => {
    this.view.fillForm(inputValuesStatus);
  };

  runForm = () => {
    this.view.bindOpenForm(this.model.checkLocalStorage);
    this.view.closeForm();
    this.view.clearInputError();
    this.view.bindSubmitForm(this.model.addInputStatus);
    this.model.bindNewInputStatus(this.setSingleInputStatus);
    this.model.bindRestoreInputValues(this.setAllInputsStatus);
  };
}
