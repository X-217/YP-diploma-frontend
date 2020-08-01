'use strict';
import validatorMessages from "../constants/validator-messages";
export default class FormValidator {
    constructor() {
    };

    setEventListeners(obj) {
        obj.form.addEventListener('input', () => this.setSubmitButtonState.call(this, obj));
    };
    _validateInputElement() {
      if (this.validity.valueMissing) {
            this.nextElementSibling.textContent = validatorMessages.fieldRequired;
            return false;
        }
        if ((this.validity.tooShort) && (this.classList.contains("form__input_password"))) {
            this.nextElementSibling.textContent = validatorMessages.passwordTooShort ;
            return false;
        }
      if ((this.validity.tooShort) && (this.classList.contains("form__input_username"))) {
        this.nextElementSibling.textContent = validatorMessages.nameLengthBad;
        return false;
      }
        if ((!this.validity.valid) && (this.classList.contains("form__input_email")) ){
            this.nextElementSibling.textContent = validatorMessages.emailNotValid;
            return false;
        }
        this.nextElementSibling.textContent = "";
        return true;
    };
    setSubmitButtonState(obj) {
        const emailIsValid = this._validateInputElement.call(obj.emailInput);
        const passwordIsValid = this._validateInputElement.call(obj.passwordInput);
        const nameIsValid = obj.name.classList.contains("form__item-is-visible") ? this._validateInputElement.call(obj.nameInput) : true;
        if (emailIsValid && passwordIsValid && nameIsValid) {
            obj.submitButton.removeAttribute("disabled");
            obj.submitButton.classList.add("form__button_activate");
        } else {
            obj.submitButton.setAttribute("disabled", "");
            obj.submitButton.classList.remove("form__button_activate");
        }
    };
}
