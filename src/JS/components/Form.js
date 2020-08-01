'use strict';
import MainApi from "../api/MainApi";
import formMessages from "../constants/form-messages";
import mainApiParams from "../constants/main-api-params";


export default class Form {
  constructor(header) {
    this.mainApi = new MainApi({
      baseUrl: 'http://localhost:3000', /*'https://api.x-217.ru/',*/
      /*        headers: {
                'Content-Type': 'application/json',*/
    });
    this.header = header;
    /**/
    this.popup = document.querySelector(".popup");
    this.form = document.querySelector(".form");
    /**/
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

    this.messageUserExist = document.querySelector(".form__message_user-exist");

    this.submitButton = document.querySelector(".form__button");

    this.offer = document.querySelector(".form__offer");
    this.offerText = document.querySelector(".form__offer-text");
    this.offerButton = document.querySelector(".form__offer-button");


    this._login = this._login.bind(this);
    this._signup = this._signup.bind(this);
    this._showSignUpForm = this._showSignUpForm.bind(this);
    this._showLoginForm = this._showLoginForm.bind(this);

    /*
        this.signup = this.signup.bind(this);
        this.success = this.success.bind(this);
        this.showSignupPopup=this.showSignupPopup.bind(this);
        this.showLoginPopup=this.showLoginPopup.bind(this);

        this.close=this.close.bind(this)*/
  };


  _setInitialTextValues() {
    this.title.textContent = ""
    this.emailTitle.textContent = formMessages.emailTitle;
    this.emailInput.placeholder = formMessages.emailPlaceholder;
    this.emailValidationMessage.textContent = formMessages.emailValidationMessage;
    this.passwordTitle.textContent = formMessages.passwordTitle;
    this.passwordInput.placeholder = formMessages.passwordPlaceholder;
    this.passwordValidationMessage.textContent = formMessages.passwordValidationMessage;
    this.nameTitle.textContent = formMessages.nameTitle;
    this.nameInput.placeholder = formMessages.namePlaceholder;
    this.nameValidationMessage.textContent = formMessages.nameValidationMessage;
    this.messageUserExist.textContent = formMessages.messageUserExist;
    this.submitButton.textContent = "";
    this.offerText.textContent = "";
    this.offerButton.textContent = "";
    this._clear = this._clear.bind(this);
  }


  show() {

    this._setInitialTextValues();
    this._clear();
    this._showLoginForm();

  };

  _showLoginForm() {

    this._clear();
    this._setInitialTextValues();
    this.title.textContent = formMessages.loginTitle;
    this.submitButton.textContent = formMessages.loginSubmitButton;
    this.offerText.textContent = formMessages.loginOfferText;
    this.offerButton.textContent = formMessages.loginOfferButtonText;

    this.email.classList.add("form__item-is-visible");
    this.password.classList.add("form__item-is-visible");

    this._setLoginEventListeners();
    this.submitButton.removeAttribute("disabled");
    this.submitButton.classList.add("form__button_activate");

  };

  _setLoginEventListeners() {
    this.form.addEventListener('submit', this._login);
    this.offerButton.addEventListener('click', this._showSignUpForm);
  };

  _login(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    this.mainApi.signin(email, password)
      .then((res) => {
        if (res._id) {                 /* если получили с сервера данные пользователя проверим наличие куки */
          this.mainApi.getUserData()
            .then((res) => {            /* кука подтверждена */
              this.header.render(true, res.name);
            })
            .catch((err) => {         /* кука не подтверждена */
              alert("Ошибка сервера, попробуйте ещё раз");
            });
        } else { /* с сервера пришло сообщение об ошибке */
          if (res.message) {
            alert (res.message)
          } else {
            alert("Неверная почта или пароль")
          }
        }
      })
      .catch((err) => {
        alert("Ошибка связи с сервером");
      });
  };

  _removeLoginEventListeners() {
    this.form.removeEventListener('submit', this._login);
    this.offerButton.removeEventListener('click', this._showSignUpForm);
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
  };

  _setSignUpEventListeners() {
    this.form.addEventListener('submit', this._signup);
    this.offerButton.addEventListener('click', this._showLoginForm.bind(this), {once: true});
  };

  _signup(event) {
    console.log("signup");
    event.preventDefault();
    event.stopImmediatePropagation();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const name = this.nameInput.value;
    this.mainApi.signup(name, email, password)
      .then((res) => {
      })
      .catch((err) => {
      })
  }


  /*                                           */

  /*    if ('success') {
        this.header.render(true, "Вася");
      }

      this.close();*/


  /*


    setSuccessPopupEventListeners() {

      this.offerButton.addEventListener('click', this.success, {once: true});
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
    };*/

  setServerError() {
    /*добавляет форме ошибку, пришедшую с сервера*/
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

  _validateForm() {
    /*валидирует всю форму*/
  };

  _clear() {
    /*вспомогательный метод, очищает поля формы*/
    this.emailInput.value = "";
    this.passwordInput.value = "";
    this.nameInput.value = "";
  };

  _getInfo() {
    /*вспомогательный метод, возвращает данные формы*/
  };

  addEventListener(submit, login, param3) {

  };
};

