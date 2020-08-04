'use strict';

export default class Popup {
    constructor() {
      this.container = document.querySelector(".popup");
      this.closeButton = document.querySelector(".popup__close");
      this.close=this.close.bind(this);
    };

  open() {
    this.container.classList.add('popup_is-visible');
    this.closeButton.addEventListener('click', this.close, {once: true});
  }

  close() {
    this.container.classList.remove('popup_is-visible');
  };
};

