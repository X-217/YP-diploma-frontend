'use strict';
import MainApi from "../api/MainApi";


export default class Popup {
    constructor(formValidator, header) {
      this.mainApi = new MainApi({
        baseUrl:  'http://localhost:3000', /*'https://api.x-217.ru/',*/
/*        headers: {
          'Content-Type': 'application/json',*/
        });
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
      this.closeButton = document.querySelector(".popup__close");
      this.formValidator = formValidator;
      this.header = header;
      this.login = this.login.bind(this);
      this.signup = this.signup.bind(this);
      this.success = this.success.bind(this);
      this.showSignupPopup=this.showSignupPopup.bind(this);
      this.showLoginPopup=this.showLoginPopup.bind(this);

      this.close=this.close.bind(this)
    };

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
    this.container.classList.add('popup__item-is-visible');
    this.email.classList.add("popup__item-is-visible");
    this.password.classList.add("popup__item-is-visible");
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

    this.container.classList.add('popup__item-is-visible');
    this.email.classList.add("popup__item-is-visible");
    this.password.classList.add("popup__item-is-visible");
    this.name.classList.add("popup__item-is-visible");
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

    this.container.classList.add("popup__item-is-visible");

    this.offer.classList.add("popup__offer-success");
    this.offerText.classList.add("popup__offer-text_success");
    this.submitButton.classList.add("popup__button_success");
    this.title.classList.add("popup__title_success");
    this.setSuccessPopupEventListeners();
  };

  login(event) {

    event.preventDefault();
    event.stopImmediatePropagation();
    console.log('login');
    /*        осуществляем авторизацию          */
    console.log (this.mainApi.signin());
    /*                                           */
    if ('success') {
      this.header.render(true, "Вася");
    }

    this.close();
  };

  signup(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    /*        осуществляем регистрацию нового пользователя          */
    this.mainApi.signup();
    /*        осуществляем регистрацию нового пользователя          */
    if ('success') {
      this.header.render(false);
      this.close();
      this.showSuccessPopup();
    }
  }

  success() {
    this.close();
    this.submitButton.classList.remove("popup__button_success");
    this.open();
  }


  open() {
    this.closeButton.addEventListener('click', this.close, {once: true});
    this.setValidatonEventListeners(this);
    this.showLoginPopup();
  }

  close() {
    this.clearContent();
    this.removeEventListeners();
    this.closeButton.removeEventListener('click', this.close);
    this.container.classList.remove('popup__item-is-visible');
  };

  clearContent() {
    this.emailInput.value = "";
    this.passwordInput.value = "";
    this.nameInput.value = "";
    this.email.classList.remove("popup__item-is-visible");
    this.name.classList.remove("popup__item-is-visible");
    this.password.classList.remove("popup__item-is-visible");

  };




  setContent() {
    this.offerButton.textContent = this.text.offerButtonText;
    this.submitButton.textContent = this.text.submitButtonText;
    this.title.textContent = this.text.title;
/*  вставляет в попап содержимое, например, форму входа или сообщение об успешной регистрации; */
  }
};

