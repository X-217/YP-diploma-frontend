'use strict';
import Popup from "./Popup.js";
export default class SignupPopup extends Popup {
  constructor(formValidator) {
    super();
    this.text = {
      title: "Регистрация",
      submitButtonText: "Зарегистрироваться",
      offerButtonText: "Войти",
    };
    this.errorMessages = {
      valueMissing: "Это обязательное поле",
      validationLength: "Должно быть от 2 до 30 символов",
      isNotMail: "Неправильный формат email",
    };
    this.formValidator = formValidator;
  };
    setEventListeners() {
      this.form.addEventListener('submit', this.sendForm.bind(this), {once: true});
      this.closeButton.addEventListener('click', this.close.bind(this), {once: true});
    };
  sendForm(event) {
    this.close();
  };

  open() {
    this.title.textContent = this.text.title;
    this.submitButton.textContent = this.text.submitButtonText;
    this.offerButton.textContent=this.text.offerButtonText;
    this.email.classList.add("item_is-visible");
    this.password.classList.add("item_is-visible");
    this.name.classList.add("item_is-visible");

    this.setEventListeners(this);
    this.formValidator.setEventListeners(this);
    this.formValidator.setSubmitButtonState(this);
    this.email.classList.add("item_is-visible");
    this.password.classList.add("item_is-visible");
    this.container.classList.add('item_is-visible');
    };
}
