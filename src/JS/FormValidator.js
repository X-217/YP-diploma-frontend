'use strict';
export default class FormValidator {
    constructor() {
    };

    setEventListeners(obj) {
        obj.form.addEventListener('input', () => this.setSubmitButtonState.call(this, obj));
    };
    _validateInputElement() {
      if (this.validity.valueMissing) {
            this.nextElementSibling.textContent = "Это обязательное поле";
            return false;
        }
        if ((this.validity.tooShort) && (this.classList.contains("popup__input_password"))) {
            this.nextElementSibling.textContent = "Длина пароля должна быть не менее 8 символов";
            return false;
        }
      if ((this.validity.tooShort) && (this.classList.contains("popup__input_username"))) {
        this.nextElementSibling.textContent = "Должно быть от 2 до 30 символов";
        return false;
      }
        if (!this.validity.valid) {
            this.nextElementSibling.textContent = "Неправильный формат email";
            return false;
        }
        this.nextElementSibling.textContent = "";
        return true;
    };
    setSubmitButtonState(obj) {
        const firstVal = this._validateInputElement.call(obj.emailInput, obj.errorMessages);
        const secVal = this._validateInputElement.call(obj.passwordInput, obj.errorMessages);
        const thrVal = obj.name.classList.contains("form__item-is-visible") ? this._validateInputElement.call(obj.nameInput, obj.errorMessages) : true;
        if (firstVal && secVal && thrVal) {
            obj.submitButton.removeAttribute("disabled");
            obj.submitButton.classList.add("form__button_activate");
        } else {
            obj.submitButton.setAttribute("disabled", "");
            obj.submitButton.classList.remove("form__button_activate");
        }
    };
}
