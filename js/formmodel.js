export default class FormModel {
  constructor() {
    this.namesPattern =
      /^(?=.{2,40}$)([A-Za-zÀ-ÖØ-öø-ÿ])+(?:[-'\s][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    this.emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.inputValuesStatus = [];
    this.currentInput = null;
    this.currentInputStatus = null;
  }

  bindNewInputStatus(callback) {
    this.onNewInputStatus = callback;
  }

  checkFirstName = (inputStatus) => this.namesPattern.test(inputStatus);

  checkEmail = (inputStatus) => this.emailPattern.test(inputStatus);

  checkNbOfTournaments = (strNumber) => parseInt(strNumber, 10);

  checkDate = (strDate) => {
    const inputDate = new Date(strDate);
    const todayDate = new Date();
    if (!isNaN(inputDate.getTime()) && todayDate > inputDate) {
      const datesDiff = new Date(todayDate - inputDate);
      return datesDiff.getUTCFullYear() - 1970;
    }
  };

  checkAge = (ageVal) => {
    // handle error message here
    if (ageVal) {
      return ageVal > 7 && ageVal < 77;
    }
  };

  addinputStatus = (textInputs) => {
    this.inputValuesStatus = [];
    textInputs.forEach((input) => {
      const inputStatus = { id: input.id, isValid: false };
      switch (input.type) {
        case 'text':
          inputStatus.isValid = this.checkFirstName(input.value);
          break;
        case 'email':
          inputStatus.isValid = this.checkEmail(input.value);
          break;
        case 'date':
          inputStatus.isValid = this.checkDate(input.value);
          break;
        case 'number':
          inputStatus.isValid = this.checkNbOfTournaments(input.value);
          break;
        default:
          console.log('champs de type inconnu ou type non précisé');
      }
      this.inputValuesStatus.push(inputStatus);
    });
    this.onNewInputStatus(this.inputValuesStatus);
  };
}
