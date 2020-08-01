'use strict';
import MainApi from "../api/MainApi";
import formMessages from "../constants/form-messages";

export default class Form {
  constructor(popup, header, formValidator) {
    this.mainApi = new MainApi();
    this.header = header;
    this.popup = popup;
    this.formValidator = formValidator;

    this.form=document.querySelector(".form");
    this.title = document.querySelector(".form__title");

    this.email = document.querySelector(".form__item_email");
    this.emailTitle = document.querySelector(".form__item-name_email");
    this.emailInput = document.querySelector(".form__input_email");
    this.emailValidationMessage = document.querySelector(".form__message_email-not-valid");

    this.password = document.querySelector(".form__item_password");
    this.passwordTitle = document.querySelector(".form__item-name_password");
    this.passwordInput = document.querySelector(".form__input_password");
    this.passwordValidationMessage = document.querySelector(".form__message_password-not-valid");

    this.name = document.querySelector(".form__item_username");
    this.nameTitle = document.querySelector(".form__item-name_username");
    this.nameInput = document.querySelector(".form__input_username");
    this.nameValidationMessage = document.querySelector(".form__message_name-not-valid");

    this.messageFromServer = document.querySelector(".form__message_from-server");

    this.submitButton = document.querySelector(".form__button");

    this.offer = document.querySelector(".form__offer");
    this.offerText = document.querySelector(".form__offer-text");
    this.offerButton = document.querySelector(".form__offer-button");

    this._login = this._login.bind(this);
    this._signup = this._signup.bind(this);
    this._showSignUpForm = this._showSignUpForm.bind(this);
    this._showLoginForm = this._showLoginForm.bind(this);
  };

  _setInitialTextValues() {
    this.title.textContent = ""
    this.emailTitle.textContent = formMessages.emailTitle;
    this.emailInput.placeholder = formMessages.emailPlaceholder;
    this.emailValidationMessage.textContent = "";
    this.passwordTitle.textContent = formMessages.passwordTitle;
    this.passwordInput.placeholder = formMessages.passwordPlaceholder;
    this.passwordValidationMessage.textContent = "";
    this.nameTitle.textContent = formMessages.nameTitle;
    this.nameInput.placeholder = formMessages.namePlaceholder;
    this.nameValidationMessage.textContent = "";
    this.messageFromServer.textContent = "";
    this.submitButton.textContent = "";
    this.offerText.textContent = "";
    this.offerButton.textContent = "";
    this._clear = this._clear.bind(this);
  }

  _setLoginEventListeners() {
    this.form.addEventListener('submit', this._login);
    this.offerButton.addEventListener('click', this._showSignUpForm);

  };
  _setSignUpEventListeners() {
    this.form.addEventListener('submit', this._signup);
    this.offerButton.addEventListener('click', this._showLoginForm);
  };

  _removeLoginEventListeners() {
    this.form.removeEventListener('submit', this._login);
    this.offerButton.removeEventListener('click', this._showSignUpForm);

  };
  _removeSignUpEventListeners() {
    this.form.removeEventListener('submit', this._signup);
    this.offerButton.removeEventListener('click', this._showLoginForm);
  };

  show() {
    this._setInitialTextValues();
    this._clear();
    this._showLoginForm();
    this.popup.open();
  };

  _showLoginForm() {
    this._clear();
    this._setInitialTextValues();
    this._removeSignUpEventListeners();
    this._setLoginEventListeners();
    this.title.textContent = formMessages.loginTitle;
    this.submitButton.textContent = formMessages.loginSubmitButton;
    this.offerText.textContent = formMessages.loginOfferText;
    this.offerButton.textContent = formMessages.loginOfferButtonText;
    this.title.classList.remove("form__title_success");
    this.offer.classList.remove("form__offer-success");
    this.offerText.classList.remove("form__offer-text_success");
    this.email.classList.add("form__item-is-visible");
    this.password.classList.add("form__item-is-visible");
    this.name.classList.remove("form__item-is-visible");
    this.submitButton.removeAttribute("disabled");
    this.submitButton.classList.remove("form__button_hide");
    this.submitButton.classList.add("form__button_activate");
    this.formValidator.setEventListeners(this);
    this.formValidator.setSubmitButtonState(this);
  };

  _showSignUpForm() {
    this._clear();
    this._setInitialTextValues();
    this._removeLoginEventListeners();
    this.title.textContent = formMessages.signUpTitle;
    this.submitButton.textContent = formMessages.signUpSubmitButton;
    this.offerText.textContent = formMessages.signUpOfferText;
    this.offerButton.textContent = formMessages.signUpOfferButtonText;
    this.email.classList.add("form__item-is-visible");
    this.password.classList.add("form__item-is-visible");
    this.name.classList.add("form__item-is-visible");
    this._setSignUpEventListeners();
    this.submitButton.removeAttribute("disabled");
    this.submitButton.classList.add("form__button_activate");
    this.formValidator.setEventListeners(this);
    this.formValidator.setSubmitButtonState(this);
  };

  _showSuccessForm() {
    this._clear();
    this.title.textContent = formMessages.successTitle;
    this.title.classList.add("form__title_success");
    this.submitButton.textContent = formMessages.signUpSubmitButton;
    this.offer.classList.add("form__offer-success");
    this.offerText.classList.add("form__offer-text_success");
    this.offerText.textContent = "";
    this.offerButton.textContent = formMessages.signUpOfferButtonText;
    this.email.classList.remove("form__item-is-visible");
    this.password.classList.remove("form__item-is-visible");
    this.name.classList.remove("form__item-is-visible");
    this.submitButton.classList.add("form__button_hide");
  }

  _login(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    this.mainApi.signin(email, password)
      .then((res) => {
        if (res._id) {      /* если получили с сервера данные пользователя проверим наличие куки */
/*          this.mainApi.getUserData()
            .then((res) => {
              if (res) {             /!* кука подтверждена *!/
                this.header.render(true, res.name);
                this._close();
              } else {
                this._setServerError(false);
              }
            })
            .catch((err) => {         /!* кука не подтверждена *!/
              this._setServerError(false);
            });*/
          this.header.render(true, res.name);
          this._close();



        } else { /* пользователь не найден */
          if (res.message) {
            this._setServerError(res.message);
          } else {
            this._setServerError("Неверная почта или пароль");
          }
        }
      })
      .catch((err) => { /* нет ответа от сервера */
        this._setServerError(false);
      });
  };

  _signup(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const name = this.nameInput.value;
    this.mainApi.signup(name, email, password)
      .then((res) => {
        if (res._id) { /* успешная регистрация */
          this._showSuccessForm();
        } else { /* неудачная регистрация */
          if (res.message) {
            this._setServerError(res.message);
          } else {
            this._setServerError("Некорректные регистрационные данные");
          }
        }
      })
      .catch((err) => {
        this._setServerError(false);
      })
  }

  _setServerError(message) {
    /*добавляет форме ошибку, пришедшую с сервера*/
    if (message) {
      this.messageFromServer.textContent = message;
    } else {
      this.messageFromServer.textContent = "Ошибка сервера, попробуйте ещё раз";
    }

  };

  _clear() {
    /*вспомогательный метод, очищает поля формы*/
    this.emailInput.value = "";
    this.passwordInput.value = "";
    this.nameInput.value = "";
    this.messageFromServer.textContent="";
  };

  _close() {
    this.popup.close();
  }
};

