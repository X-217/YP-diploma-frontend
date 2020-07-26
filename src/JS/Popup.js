'use strict';

export default class Popup {
    constructor(formValidator) {
      this.container = document.querySelector(".popup");
      this.title = document.querySelector(".popup__title");
      this.form = document.querySelector(".popup__form");
      this.email = document.querySelector(".popup__item_email");
      this.emailInput = document.querySelector(".popup__input_email");
      this.password = document.querySelector(".popup__item_password");
      this.passwordInput = document.querySelector(".popup__input_password");
      this.name = document.querySelector(".popup__item_username");
      this.nameInput = document.querySelector(".popup__input_username");
      this.messageUserExist = document.querySelector(".popup__message_user-exist");
      this.submitButton = document.querySelector(".popup__button");
      this.offer = document.querySelector(".popup__offer");
      this.offerText = document.querySelector(".popup__offer-text");
      this.offerButton = document.querySelector(".popup__offer-button");

      this.closeButton = document.querySelector(".popup__close_form");
/*      this.saved=saved;*/
      this.formValidator = formValidator;
    };

  setLoginEventListeners() {
    this.form.addEventListener('submit', this.doSignin.bind(this), {once: true});
    this.closeButton.addEventListener('click', this.close.bind(this), {once: true});
    this.offerButton.addEventListener('click', this.checkoutSignup.bind(this), {once: true});
  };
  removeLoginEventListeners() {
    this.form.removeEventListener('submit', this.doSignin.bind(this), {once: true});
    this.closeButton.removeEventListener('click', this.close.bind(this), {once: true});
    this.offerButton.removeEventListener('click', this.checkoutSignup.bind(this), {once: true});
  };

  setSignupEventListeners() {
    this.form.addEventListener('submit', this.doSignup.bind(this), {once: true});
    this.closeButton.addEventListener('click', this.close.bind(this), {once: true});
    this.offerButton.addEventListener('click', this.doLogin.bind(this), {once: true});
  };
  removeSignupEventListeners() {
    this.form.removeEventListener('submit', this.doSignup.bind(this), {once: true});
    this.closeButton.removeEventListener('click', this.close.bind(this), {once: true});
    this.offerButton.removeEventListener('click', this.checkoutLogin.bind(this), {once: true});
  };

  setSuccessEventListeners() {
    this.offerButton.addEventListener('click', this.doSuccess.bind(this), {once: true}); /**/
    this.closeButton.addEventListener('click', this.close.bind(this), {once: true});
  };
  removeSuccessEventListeners() {
    this.offerButton.removeEventListener('click', this.checkoutLogin.bind(this), {once: true}); /**/
    this.closeButton.removeEventListener('click', this.close.bind(this), {once: true});
  };

  checkoutLogin() {
    this.removeSignupEventListeners();
    this.text = {
      title: "Вход",
      submitButtonText: "Войти",
      offerButtonText: "Зарегистрироваться",
    };
    this.offerButton.textContent=this.text.offerButtonText;
    this.submitButton.textContent = this.text.submitButtonText;
    this.title.textContent = this.text.title;
    this.container.classList.add('item_is-visible');
    this.email.classList.add("item_is-visible");
    this.password.classList.add("item_is-visible");
    this.setLoginEventListeners(this);
    this.formValidator.setEventListeners(this);
    this.formValidator.setSubmitButtonState(this);
  };
  doSignin(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    /*                                          */
    /*        осуществляем авторизацию          */
    /*                                          */
    if ('success') {
      document.querySelector('.header__container').classList.add("header__container_logged");
      document.querySelector('.header__auth-button').classList.add("header__auth-button_logged");
      document.querySelector('.header__auth-button').textContent = "Пользователь";
      document.querySelector('.header__saved-link').textContent = "Сохраненные статьи";
    }
    this.close();
  };

  checkoutSignup() {
    this.removeLoginEventListeners(this);
    this.text = {
      title: "Регистрация",
      submitButtonText: "Зарегистрироваться",
      offerButtonText: "Войти",
    };
    this.offerButton.textContent=this.text.offerButtonText;
    this.submitButton.textContent = this.text.submitButtonText;
    this.title.textContent = this.text.title;
    this.name.classList.add("item_is-visible");
    this.setSignupEventListeners(this);
    this.formValidator.setEventListeners(this);
    this.formValidator.setSubmitButtonState(this);

  };
  doSignup(event) {

    event.preventDefault();
    event.stopImmediatePropagation();
    /*                                          */
    /*        создаем нового пользователя       */
    /*                                          */
    this.email.classList.remove("item_is-visible");
    this.name.classList.remove("item_is-visible");
    this.password.classList.remove("item_is-visible");
    this.removeSignupEventListeners(this);
    this.checkoutSuccess();

  };

  doLogin() {
    this.email.classList.remove("item_is-visible");
    this.name.classList.remove("item_is-visible");
    this.password.classList.remove("item_is-visible");
    this.removeSignupEventListeners(this);
    this.checkoutLogin();
  };

  checkoutSuccess() {
    this.setSuccessEventListeners(this);
    this.text = {
      title: "Пользователь успешно зарегистрирован!",
      offerButtonText: "Выполнить вход",
    };
    this.title.textContent = this.text.title;
    this.offerButton.textContent=this.text.offerButtonText;
    this.container.classList.add("item_is-visible");
    this.offer.classList.add("popup__offer-success");
    this.offerText.classList.add("popup__offer-text_success");
    this.submitButton.classList.add("popup__button_success");
    this.title.classList.add("popup__title_success");
    this.setSuccessEventListeners(this);
  }

doSuccess() {
  this.offer.classList.remove("popup__offer-success");
  this.offerText.classList.remove("popup__offer-text_success");
  this.submitButton.classList.remove("popup__button_success");
  this.title.classList.remove("popup__title_success");
  this.removeSuccessEventListeners();
}

    close() {
      this.emailInput.value="";
      this.passwordInput.value="";
      this.nameInput.value="";
      this.container.classList.remove('item_is-visible');
    };
};

