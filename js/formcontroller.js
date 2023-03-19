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
   * Sets callback in FormView to process specific input
   * @param {{}} inputStatus
   */
  setSingleInputStatus = (inputStatus) => {
    this.view.displayInputStatus(inputStatus);
  };

  /**
   * Sets callback in FormView to refill form with values from local storage
   * @param {Array} inputValuesStatus
   */
  setAllInputsStatus = (inputValuesStatus) => {
    this.view.fillForm(inputValuesStatus);
  };

  /**
   * Runs form actions
   * Binds FormView events to FormModel methods
   * Sets callbacks from FormView for FormModel methods
   */
  init = () => {
    this.view.bindOpenForm(this.model.checkLocalStorage);
    this.view.bindCloseForm(this.model.addInputStatus);
    this.view.bindSubmitForm(this.model.addInputStatus);
    this.view.bindClearLocalStorage(this.model.clearLocalStorage);
    this.view.bindOnUnload(this.model.clearLocalStorage);
    this.model.bindNewInputStatus(this.setSingleInputStatus);
    this.model.bindRestoreInputValues(this.setAllInputsStatus);
  };
}
