export default class Header {
  constructor() {
    this.header = document.querySelector('.header');
    this.container = document.querySelector('.header__container');
    this.authButton = document.querySelector('.header__auth-button');
    this.itemSaved = document.querySelector('.header__item_saved');
    this.itemSavedLink = document.querySelector('.header__saved-link');
  };

  render(isLoggedIn,userName){
    this._setSavedPagesLinkText ("Сохраненные статьи")
    if (isLoggedIn) {
      this._displayHeaderLogged()
      this._displayAuthButtonLogged();
      this._showUserName(userName);
      this._showSavedPagesTab();
      this._showSavedPagesLink();
    } else {
      this._displayHeaderUnLogged();
      this._showAuthButtonDefaultText();
      this._displayAuthButtonUnLogged();
      this._hideSavedPagesTab();
      this._hideSavedPagesLink();
    }
  };

  _displayHeaderLogged() {
    this.container.classList.add("header__container_logged");
  };
  _displayAuthButtonLogged() {
    this.authButton.classList.add("header__auth-button_logged");
  };
  _showUserName(userName) {
    this.authButton.textContent = userName;
  };
  _showSavedPagesTab() {
    this.itemSaved.classList.remove("header__item_hidden");
  };
  _showSavedPagesLink() {
    this.itemSavedLink.classList.add("header__saved-link_active");
  };
  _setSavedPagesLinkText (text) {
    this.itemSavedLink.textContent = text;
  }

  _displayHeaderUnLogged() {
    this.container.classList.remove("header__container_logged");
  };
  _displayAuthButtonUnLogged() {
    this.authButton.classList.remove("header__auth-button_logged");
  };
  _showAuthButtonDefaultText() {
    this.authButton.textContent = "Авторизоваться";
  };
  _hideSavedPagesTab() {
    this.itemSaved.classList.add("header__item_hidden");
  };
  _hideSavedPagesLink() {
    this.itemSavedLink.classList.remove("header__saved-link_active");
  };
}
