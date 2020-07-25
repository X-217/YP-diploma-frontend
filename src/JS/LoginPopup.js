'use strict';
import Popup from "./Popup.js";
export default class LoginPopup extends Popup {
  constructor(formValidator) {
    super();
    this.text = {
      title: "Вход",
      submitButtonText: "Войти",
      offerButtonText: "Зарегистрироваться",
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

    this.setEventListeners(this);
    this.formValidator.setEventListeners(this);
    this.formValidator.setSubmitButtonState(this);
    this.email.classList.add("item_is-visible");
    this.password.classList.add("item_is-visible");
    this.container.classList.add('item_is-visible');
    };
}
