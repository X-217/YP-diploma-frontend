'use strict';

export default class Popup {
    constructor() {
      this.container = document.querySelector(".popup");
      this.closeButton = document.querySelector(".popup__close");
      this.close=this.close.bind(this);
    };
/*

  setLoginPopupEventListeners() {
    this.form.addEventListener('submit', this.login, {once: true});
    this.offerButton.addEventListener('click', this.showSignupPopup, {once: true});
  };

  setSignupPopupEventListeners() {
    this.form.addEventListener('submit', this.signup, {once: true});
    this.offerButton.addEventListener('click', this.showLoginPopup.bind(this), {once: true});
  };

  setSuccessPopupEventListeners() {

    this.offerButton.addEventListener('click', this.success, {once: true});
  };

  setValidatonEventListeners() {
    this.formValidator.setEventListeners(this);
    this.formValidator.setSubmitButtonState(this);
  };

  removeEventListeners() {
    this.form.removeEventListener('submit', this.login);
    this.form.removeEventListener('submit', this.signup);
    this.offerButton.removeEventListener('click', this.showSignupPopup);
    this.offerButton.removeEventListener('click', this.showLoginPopup);
};

  showLoginPopup(event) {
    this.removeEventListeners();
    this.clearContent();
    this.setLoginPopupEventListeners();

    this.text = {
      title: "Вход",
      submitButtonText: "Войти",
      offerButtonText: "Зарегистрироваться",
    };
    this.setContent();
    this.container.classList.add('form__item-is-visible');
    this.email.classList.add("form__item-is-visible");
    this.password.classList.add("form__item-is-visible");
  };

  showSignupPopup(event) {
    this.removeEventListeners();
    this.clearContent()
    event.preventDefault();
    event.stopImmediatePropagation();
    this.setSignupPopupEventListeners();
    this.text = {
      title: "Регистрация",
      submitButtonText: "Зарегистрироваться",
      offerButtonText: "Войти",
    };
    this.setContent();

    this.container.classList.add('form__item-is-visible');
    this.email.classList.add("form__item-is-visible");
    this.password.classList.add("form__item-is-visible");
    this.name.classList.add("form__item-is-visible");
  };

  showSuccessPopup(event) {
    this.clearContent();
    this.removeEventListeners();
    this.setSuccessPopupEventListeners();

    this.text = {
      title: "Пользователь успешно зарегистрирован!",
      offerButtonText: "Выполнить вход",
    };
    this.title.textContent = this.text.title;
    this.offerButton.textContent = this.text.offerButtonText;

    this.container.classList.add("form__item-is-visible");

    this.offer.classList.add("form__offer-success");
    this.offerText.classList.add("form__offer-text_success");
    this.submitButton.classList.add("form__button_success");
    this.title.classList.add("form__title_success");
    this.setSuccessPopupEventListeners();
  };

  login(event) {

    event.preventDefault();
    event.stopImmediatePropagation();
    console.log('login');
    /!*        осуществляем авторизацию          *!/
    console.log (this.mainApi.signin());
    /!*                                           *!/
    if ('success') {
      this.header.render(true, "Вася");
    }

    this.close();
  };

  signup(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    /!*        осуществляем регистрацию нового пользователя          *!/
    this.mainApi.signup();
    /!*        осуществляем регистрацию нового пользователя          *!/
    if ('success') {
      this.header.render(false);
      this.close();
      this.showSuccessPopup();
    }
  }

  success() {
    this.close();
    this.submitButton.classList.remove("form__button_success");
    this.open();
  }
*/


  open() {
/*    this.form.show();*/
    this.container.classList.add('popup_is-visible');
    this.closeButton.addEventListener('click', this.close, {once: true});
/*     this.showLoginPopup();*/
  }

  close() {
    this.container.classList.remove('popup_is-visible');
/*    this.clearContent();
    this.removeEventListeners();
    this.closeButton.removeEventListener('click', this.close);
    this.container.classList.remove('form__item-is-visible');*/
  };

  clearContent() {
/*
    this.email.classList.remove("form__item-is-visible");
    this.name.classList.remove("form__item-is-visible");
    this.password.classList.remove("form__item-is-visible");*/

  };

  setContent() {
/*    this.offerButton.textContent = this.text.offerButtonText;
    this.submitButton.textContent = this.text.submitButtonText;
    this.title.textContent = this.text.title;*/
/*  вставляет в попап содержимое, например, форму входа или сообщение об успешной регистрации; */
  }
};

