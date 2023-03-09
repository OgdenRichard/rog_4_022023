export default class FormModel {
  constructor() {
    this.inputValuesStatus = [];
    this.namesPattern =
      /^(?=.{2,40}$)([A-Za-zÀ-ÖØ-öø-ÿ])+(?:[-'\s][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    this.emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  }

  bindNewInputStatus = (callback) => {
    this.onNewInputStatus = callback;
  };

  bindLocationChoice = (callback) => {
    this.processLocationChoice = callback;
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
      return ageVal > 7 && ageVal < 77;
    }
  };

  checkLocation = () => {};

  addinputStatus = (textInputs, locations, checkbox) => {
    this.inputValuesStatus = [];
    textInputs.forEach((input) => {
      const inputStatus = { id: input.id, isValid: false };
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
            console.error('champ de type inconnu ou type non précisé');
        }
      }
      this.inputValuesStatus.push(inputStatus);
      this.onNewInputStatus(input, inputStatus);
    });
    const locationChoice = { isValid: false };
    locations.forEach((location) => {
      if (location.checked) {
        locationChoice.id = location.id;
        locationChoice.isValid = true;
        this.inputValuesStatus.push(locationChoice);
      }
    });
    if (!locationChoice.isValid) {
      this.inputValuesStatus.push(locationChoice);
    }
    this.processLocationChoice(locationChoice);
  };
}
