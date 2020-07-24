'use strict';

export default class Popup {
    constructor() {
        this.container = document.querySelector(".popup");
        this.title = document.querySelector(".popup__title");
        this.form = document.querySelector(".popup__form");
        this.email = document.querySelector(".popup__item_email");
        this.password = document.querySelector(".popup__item_password");
        this.name = document.querySelector(".popup__item_name");
        this.submitButton = document.querySelector(".popup__button");
        this.closeButton = document.querySelector(".popup__close_form");
    };
    close() {
        this.container.classList.remove('item_is-visible');
    };
};

