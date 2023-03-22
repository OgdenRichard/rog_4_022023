export default class FormModel {
  /**
   * @constructor
   */
  constructor() {
    this.inputValuesStatus = [];
    this.localStorageKey = 'input_values';
    this.namesPattern =
      /^(?=.{2,40}$)([A-Za-zÀ-ÖØ-öø-ÿ])+(?:['\s][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    this.emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  }

  /**
   * Refresh input status after verification
   * Binding is set in FormController
   * @param {callback} callback
   */
  bindNewInputStatus = (callback) => {
    this.onNewInputStatus = callback;
  };

  /**
   * Loads values from local storages to restore them in FormView
   * Binding is set in FormController
   * @param {callback} callback
   */
  bindRestoreInputValues = (callback) => {
    this.onRestoreInputValues = callback;
  };

  /**
   * Gets local storage input values if token exists
   */
  checkLocalStorage = () => {
    this.inputValuesStatus = [];
    this.getLocalStorage();
    if (this.inputValuesStatus.length) {
      this.onRestoreInputValues(this.inputValuesStatus);
    }
  };

  /**
   * Writes input values in local storage
   */
  commitLocalStorage = () => {
    window.localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(this.inputValuesStatus)
    );
  };

  /**
   * Gets local storage
   */
  getLocalStorage = () => {
    const storageValues = window.localStorage.getItem(this.localStorageKey);
    if (storageValues !== null) {
      this.inputValuesStatus = JSON.parse(storageValues);
    }
  };

  /**
   * Removes input values from local storage
   */
  clearLocalStorage = () => {
    window.localStorage.removeItem(this.localStorageKey);
  };

  /**
   * Checks names validity from regex pattern
   * @param {string} inputStatus
   * @returns {Boolean}
   */
  checkName = (inputStatus) => this.namesPattern.test(inputStatus);

  /**
   * Checks email validity from regex pattern
   * @param {string} inputStatus
   * @returns {Boolean}
   */
  checkEmail = (inputStatus) => this.emailPattern.test(inputStatus);

  /**
   * Checks number validity
   * @param {number} strNumber
   * @returns {Boolean}
   */
  checkNbOfTournaments = (strNumber) => {
    const nbInt = parseInt(strNumber, 10);
    return nbInt >= 0 && nbInt <= 10;
  };

  /**
   * Checks date validity
   * @param {string} strDate
   * @returns {number|Boolean}
   */
  checkDate = (strDate) => {
    const inputDate = new Date(strDate);
    const todayDate = new Date();
    if (!Number.isNaN(inputDate.getTime()) && todayDate > inputDate) {
      const datesDiff = new Date(todayDate - inputDate);
      console.log(datesDiff.getUTCFullYear());
      return datesDiff.getUTCFullYear() - 1970;
    }
    return false;
  };

  /**
   * Checks age validity
   * @param {number} ageVal
   * @returns {Boolean}
   */
  checkAge = (ageVal) => {
    if (ageVal) {
      return ageVal >= 7 && ageVal <= 77;
    }
    return false;
  };

  /**
   * Checks whether a checkbox has to be checked or not
   * Sends result back to FormView through FormController
   * @param {Array} checkboxes
   */
  verifyCheckboxes = (checkboxes) => {
    checkboxes.forEach((checkbox) => {
      const checkBoxInput = { type: 'checkbox', isValid: true };
      checkBoxInput.id = checkbox.id;
      checkBoxInput.checked = checkbox.checked;
      if (checkbox.required && !checkbox.checked) {
        checkBoxInput.isValid = false;
      }
      this.inputValuesStatus.push(checkBoxInput);
      this.onNewInputStatus(checkBoxInput);
    });
  };

  /**
   * Checks if any location has been chosen or not
   * Sends result back to FormView through FormController
   * @param {Array} locations
   */
  verifyLocations = (locations) => {
    const locationChoice = { type: 'radio', isValid: false };
    for (let i = 0; i < locations.length; i += 1) {
      locationChoice.id = locations[i].id;
      if (locations[i].checked) {
        locationChoice.isValid = true;
        break;
      }
    }
    this.inputValuesStatus.push(locationChoice);
    this.onNewInputStatus(locationChoice);
  };

  /**
   * Processes text inputs
   * Sends result back to FormView through FormController
   * Number with exponent or float value will be converted to integer
   * @param {HTMLElement} textInputs
   */
  verifyTextInputs = (textInputs) => {
    textInputs.forEach((input) => {
      const inputStatus = {
        type: 'text',
        value: input.value,
        id: input.id,
        isValid: false,
      };
      if (input.type !== 'number' && !input.value.length) {
        inputStatus.isEmpty = true;
      } else {
        switch (input.type) {
          case 'text':
            inputStatus.isValid = this.checkName(input.value);
            break;
          case 'email':
            inputStatus.isValid = this.checkEmail(input.value);
            break;
          case 'date':
            inputStatus.isValid = this.checkAge(this.checkDate(input.value));
            break;
          case 'number':
            inputStatus.isValid = this.checkNbOfTournaments(input.value);
            if (inputStatus.isValid) {
              inputStatus.value = parseInt(input.value, 10).toString();
            }
            break;
          default:
            break;
        }
      }
      this.inputValuesStatus.push(inputStatus);
      this.onNewInputStatus(inputStatus);
    });
  };

  /**
   * Checks all inputs and writes results in local storage
   * @param {Array} textInputs
   * @param {Array} locations
   * @param {Array} checkboxes
   */
  addInputStatus = (textInputs, locations, checkboxes) => {
    this.inputValuesStatus = [];
    this.verifyTextInputs(textInputs);
    this.verifyCheckboxes(checkboxes);
    this.verifyLocations(locations);
    this.commitLocalStorage();
  };
}
