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

  callbackTest = (values) => console.log(values);

  runForm = () => {
    this.view.openForm();
    this.model.bindNewInputStatus(this.callbackTest);
    this.view.bindSubmitForm(this.model.addinputStatus);
    //console.log(this.model.inputValuesStatus);

    /* this.model.bindNewInputStatus(
      this.changeInputStatus(
        this.model.currentInput,
        this.model.inputValuesStatus.at(-1)
      )
    ); */
  };

  handleInput = (input) => {
    this.model.addInputValue(input);
  };
}
