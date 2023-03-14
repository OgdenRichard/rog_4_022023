export default class FormModel {
  constructor() {
    this.inputValuesStatus = [];
    this.localStorageKey = 'input_values';
    this.namesPattern =
      /^(?=.{2,40}$)([A-Za-zÀ-ÖØ-öø-ÿ])+(?:['\s][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    this.emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  }

  bindNewInputStatus = (callback) => {
    this.onNewInputStatus = callback;
  };

  bindRestoreInputValues = (callback) => {
    this.onRestoreInputValues = callback;
  };

  checkLocalStorage = () => {
    this.inputValuesStatus = [];
    this.getLocalStorage();
    if (this.inputValuesStatus.length) {
      this.onRestoreInputValues(this.inputValuesStatus);
    }
  };

  commitLocalStorage = () => {
    window.localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(this.inputValuesStatus)
    );
  };

  getLocalStorage = () => {
    const storageValues = window.localStorage.getItem(this.localStorageKey);
    if (storageValues !== null) {
      this.inputValuesStatus = JSON.parse(storageValues);
    }
  };

  clearLocalStorage = () => {
    window.localStorage.removeItem(this.localStorageKey);
  };

  checkFirstName = (inputStatus) => this.namesPattern.test(inputStatus);

  checkEmail = (inputStatus) => this.emailPattern.test(inputStatus);

  checkNbOfTournaments = (strNumber) => parseInt(strNumber, 10) >= 0;

  checkDate = (strDate) => {
    const inputDate = new Date(strDate);
    const todayDate = new Date();
    if (!isNaN(inputDate.getTime()) && todayDate > inputDate) {
      const datesDiff = new Date(todayDate - inputDate);
      return datesDiff.getUTCFullYear() - 1970;
    }
  };

  checkAge = (ageVal) => {
    if (ageVal) {
      return ageVal >= 7 && ageVal <= 77;
    }
  };

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
            inputStatus.isValid = this.checkFirstName(input.value);
            break;
          case 'email':
            inputStatus.isValid = this.checkEmail(input.value);
            break;
          case 'date':
            inputStatus.isValid = this.checkAge(this.checkDate(input.value));
            break;
          case 'number':
            inputStatus.isValid = this.checkNbOfTournaments(input.value);
            break;
          default:
            break;
        }
      }
      this.inputValuesStatus.push(inputStatus);
      this.onNewInputStatus(inputStatus);
    });
  };

  addInputStatus = (textInputs, locations, checkboxes) => {
    this.inputValuesStatus = [];
    this.verifyTextInputs(textInputs);
    this.verifyCheckboxes(checkboxes);
    this.verifyLocations(locations);
    this.commitLocalStorage();
  };
}
