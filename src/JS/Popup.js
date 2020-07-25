'use strict';

export default class Popup {
    constructor() {
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
    };
    close() {
      this.emailInput.value="";
      this.passwordInput.value="";
      this.nameInput.value="";
        this.container.classList.remove('item_is-visible');
    };
};

