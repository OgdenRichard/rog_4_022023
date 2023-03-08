export default class FormModel {
  constructor() {
    this.namesPattern =
      /^(?=.{2,40}$)([A-Za-zÀ-ÖØ-öø-ÿ])+(?:[-'\s][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    this.emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.inputValues = [];
  }

  checkFirstName = (inputVal) => this.namesPattern.test(inputVal);

  checkEmail = (inputVal) => this.emailPattern.test(inputVal);

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

  addInputValue = (input) => {
    const inputVal = { id: input.id, valid: false };
    switch (input.type) {
      case 'text':
        inputVal.valid = this.checkFirstName(input.value);
        console.log(
          `champs de type ${input.name} name : ${checkInputVal(
            input.value,
            namesPattern
          )}`
        );
        break;
      case 'email':
        inputVal.valid = this.checkEmail(input.value);
        console.log(
          `champs de type email : ${checkInputVal(input.value, emailPattern)}`
        );
        break;
      case 'date':
        inputVal.valid = this.checkDate(input.value);
        console.log(
          `champs de type date : ${checkAge(checkDate(input.value))}`
        );
        break;
      case 'number':
        inputVal.valid = this.checkNbOfTournaments(input.value);
        console.log(
          `champs de type number : ${checkNbOfTournaments(input.value)}`
        );
        console.log(input.value.length);
        break;
      default:
        console.log('champs de type inconnu ou type non précisé');
    }
  };
}
