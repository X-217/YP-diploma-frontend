'use strict';
import Popup from "./Popup.js";
export default class SuccessPopup extends Popup {
  constructor() {
    super();
    this.text = {
      title: "Пользователь успешно зарегистрирован!",
      offerButtonText: "Выполнить вход",
    };
  };
    setEventListeners() {
      this.offerButton .addEventListener('click', this.sendForm.bind(this), {once: true}); /**/
      this.closeButton.addEventListener('click', this.close.bind(this), {once: true});
    };
  sendForm(event) {
    this.close();
  };

  open() {
    this.offer.classList.add("popup__offer-success");
    this.offerText.classList.add("popup__offer-text_success");
    this.title.classList.add("popup__title_success");
    this.title.textContent = this.text.title;
    this.offerButton.textContent=this.text.offerButtonText;
    this.setEventListeners(this);
    this.container.classList.add('item_is-visible');
    };
}
