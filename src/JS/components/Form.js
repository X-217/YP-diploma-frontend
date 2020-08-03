'use strict';
/*import MainApi from "../api/MainApi";*/
import {
  BAD_EMAIL_OR_PASSWORD,
  EMAIL_PLACEHOLDER,
  EMAIL_TITLE,
  INVALID_REGISTRATION_DATA,
  LOGIN_OFFER_BUTTON_TEXT,
  LOGIN_OFFER_TEXT,
  LOGIN_SUBMIT_BUTTON,
  LOGIN_TITLE,
  NAME_PLACEHOLDER,
  NAME_TITLE,
  PASSWORD_PLACEHOLDER,
  PASSWORD_TITLE, SERVER_ERROR,
  SIGNUP_OFFER_BUTTON_TEXT,
  SIGNUP_OFFER_TEXT,
  SIGNUP_SUBMIT_BUTTON,
  SIGNUP_TITLE,
  SUCCESS_TITLE,
} from "../constants/text/form-messages";


export default class Form {
  constructor(mainApi, popup, header, formValidator) {
    this.mainApi = mainApi;
    this.header = header;
    this.popup = popup;
    this.formValidator = formValidator;

    this.form = document.querySelector(".form");
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
    this.emailTitle.textContent = EMAIL_TITLE;
    this.emailInput.placeholder = EMAIL_PLACEHOLDER;
    this.emailValidationMessage.textContent = "";
    this.passwordTitle.textContent = PASSWORD_TITLE;
    this.passwordInput.placeholder = PASSWORD_PLACEHOLDER;
    this.passwordValidationMessage.textContent = "";
    this.nameTitle.textContent = NAME_TITLE;
    this.nameInput.placeholder = NAME_PLACEHOLDER;
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
    this.title.textContent = LOGIN_TITLE;
    this.submitButton.textContent = LOGIN_SUBMIT_BUTTON;
    this.offerText.textContent = LOGIN_OFFER_TEXT;
    this.offerButton.textContent = LOGIN_OFFER_BUTTON_TEXT;
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
    this.title.textContent = SIGNUP_TITLE;
    this.submitButton.textContent = SIGNUP_SUBMIT_BUTTON;
    this.offerText.textContent = SIGNUP_OFFER_TEXT;
    this.offerButton.textContent = SIGNUP_OFFER_BUTTON_TEXT;
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
    this.title.textContent = SUCCESS_TITLE;
    this.title.classList.add("form__title_success");
    this.submitButton.textContent = SIGNUP_SUBMIT_BUTTON;
    this.offer.classList.add("form__offer-success");
    this.offerText.classList.add("form__offer-text_success");
    this.offerText.textContent = "";
    this.offerButton.textContent = SIGNUP_OFFER_BUTTON_TEXT;
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
        if (res._id) {
          this.mainApi.getUserData() /* если получили с сервера данные пользователя проверим наличие куки */
            .then((res) => {
              if (res) {             /* кука подтверждена */
                localStorage.setItem('logged', 'true');
                localStorage.setItem('user', res._id);
                this.header.render(res.name);
                this._close();
              } else {
                this._setServerError(false);
              }
            })
            .catch((err) => {         /* кука не подтверждена */
              this._setServerError(false);
            });
          /*          this.header.render(true, res.name);
                    this._close();*/
        } else { /* пользователь не найден */
          if (res.message) {
            this._setServerError(res.message);
          } else {
            this._setServerError(BAD_EMAIL_OR_PASSWORD);
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
            this._setServerError(INVALID_REGISTRATION_DATA);
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
      this.messageFromServer.textContent = SERVER_ERROR;
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

