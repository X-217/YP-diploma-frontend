export default class Header {
  constructor() {
    this.header=document.querySelector('.header');

  };

  render(isLoggedIn,userName){
    if (isLoggedIn) {

      document.querySelector('.header__auth-button').textContent = userName;
      document.querySelector('.header__container').classList.add("header__container_logged");
      document.querySelector('.header__auth-button').classList.add("header__auth-button_logged");
      document.querySelector('.header__item_saved').classList.remove("header__item_hidden");
      document.querySelector('.header__saved-link').classList.remove("header__saved-link_hidden");
      document.querySelector('.header__saved-link').classList.add("header__saved-link_active");
    } else {
      document.querySelector('.header__auth-button').textContent = "Авторизоваться";

      document.querySelector('.header__container').classList.remove("header__container_logged");
      document.querySelector('.header__auth-button').classList.remove("header__auth-button_logged");
      document.querySelector('.header__item_saved').classList.add("header__item_hidden");
      document.querySelector('.header__saved-link').classList.add("header__saved-link_hidden");
      document.querySelector('.header__saved-link').classList.remove("header__saved-link_active");

    }


};



}
