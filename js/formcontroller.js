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
   * Sets callback in FormModel to read local storage
   */
  handleOpenForm = () => {
    this.model.checkLocalStorage();
  };

  /**
   * Sets callback in FormModel to process inputs data
   * @param {Array} textInputs
   * @param {Array} locations
   * @param {Array} checkboxes
   */
  handleSubmitOrCloseForm = (textInputs, locations, checkboxes) => {
    this.model.addInputStatus(textInputs, locations, checkboxes);
  };

  /**
   * Sets callback in FormModel to reset local storage
   */
  handleFormReset = () => {
    this.model.clearLocalStorage();
  };

  /**
   * Sets callback in FormView to process specific input
   * @param {{}} inputStatus
   */
  onSingleInputStatusChanged = (inputStatus) => {
    this.view.displayInputStatus(inputStatus);
  };

  /**
   * Sets callback in FormView to refill form with values from local storage
   * @param {Array} inputValuesStatus
   */
  onAllInputStatusChanged = (inputValuesStatus) => {
    this.view.fillForm(inputValuesStatus);
  };

  /**
   * Runs form actions
   * Binds FormView events to FormModel methods
   * Sets callbacks from FormView for FormModel methods
   */
  init = () => {
    this.view.bindOpenForm(this.handleOpenForm);
    this.view.bindCloseForm(this.handleSubmitOrCloseForm);
    this.view.bindSubmitForm(this.handleSubmitOrCloseForm);
    this.view.bindClearFormData(this.handleFormReset);
    this.model.bindNewInputStatus(this.onSingleInputStatusChanged);
    this.model.bindRestoreInputValues(this.onAllInputStatusChanged);
  };
}
