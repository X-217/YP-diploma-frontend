'use strict';
import {
  FIELD_REQUIRED,
  PASSWORD_TOO_SHORT,
  NAME_LENGTH_BAD,
  EMAIL_NOT_VALID,
} from "../constants/text/validator-messages";

export default class FormValidator {
    constructor() {
    };
    setEventListeners(obj) {
        obj.form.addEventListener('input', () => this.setSubmitButtonState.call(this, obj));
    };
    _validateInputElement() {
      if (this.validity.valueMissing) {
        this.nextElementSibling.textContent = FIELD_REQUIRED;
            return false;
        }
        if ((this.validity.tooShort) && (this.classList.contains("form__input_password"))) {
          this.nextElementSibling.textContent = PASSWORD_TOO_SHORT;
            return false;
        }
      if ((this.validity.tooShort) && (this.classList.contains("form__input_username"))) {
        this.nextElementSibling.textContent = NAME_LENGTH_BAD;
        return false;
      }
        if ((!this.validity.valid) && (this.classList.contains("form__input_email")) ){
          this.nextElementSibling.textContent = EMAIL_NOT_VALID;
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
