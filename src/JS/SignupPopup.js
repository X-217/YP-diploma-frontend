'use strict';
import Popup from "./Popup.js";
export default class SignupPopup extends Popup {
    setEventListeners() {
      this.form.addEventListener('click', this.close.bind(this), {once: true});
      this.closeButton.addEventListener('click', this.close.bind(this), {once: true});
    };
    open() {
      this.setEventListeners(this);
      this.container.classList.add('item_is-visible');
    };
}
