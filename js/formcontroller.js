/* eslint-disable import/extensions */
import FormView from './formview.js';
import FormModel from './formmodel.js';

export default class FormController {
  /**
   * @constructor
   */
  constructor() {
    this.model = new FormModel();
    this.view = new FormView();
  }

  /**
   *
   * @param {{}} inputStatus
   */
  setSingleInputStatus = (inputStatus) => {
    this.view.displayInputStatus(inputStatus);
  };

  /**
   *
   * @param {Array} inputValuesStatus
   */
  setAllInputsStatus = (inputValuesStatus) => {
    this.view.fillForm(inputValuesStatus);
  };

  /**
   *
   */
  init = () => {
    this.view.bindOpenForm(this.model.checkLocalStorage);
    this.view.bindCloseForm(this.model.addInputStatus);
    this.view.bindSubmitForm(this.model.addInputStatus);
    this.view.bindClearLocalStorage(this.model.clearLocalStorage);
    this.model.bindNewInputStatus(this.setSingleInputStatus);
    this.model.bindRestoreInputValues(this.setAllInputsStatus);
  };
}
