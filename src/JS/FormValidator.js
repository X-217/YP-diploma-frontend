'use strict';
export default class FormValidator {
    constructor() {
    };

    setEventListeners(obj) {
        obj.form.addEventListener('input', () => this.setSubmitButtonState.call(this, obj));
    };
    checkInputValidity() {
      if (this.validity.valueMissing) {
            this.nextElementSibling.textContent = "Это обязательное поле";
            return false;
        }
        if (this.validity.tooShort) {
            this.nextElementSibling.textContent = "Длина пароля должна быть не менее 8 символов";
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
        const firstVal = this.checkInputValidity.call(obj.emailInput, obj.errorMessages);
        const secVal = this.checkInputValidity.call(obj.passwordInput, obj.errorMessages);
        if (firstVal && secVal) {
            obj.submitButton.removeAttribute("disabled");
            obj.submitButton.classList.add("popup__button_activate");
        } else {
            obj.submitButton.setAttribute("disabled", "");
            obj.submitButton.classList.remove("popup__button_activate");
        }
    };
}
