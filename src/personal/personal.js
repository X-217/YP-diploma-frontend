import './personal.css';

import Popup from "../JS/components/Popup";
import FormValidator from "../JS/FormValidator";

const menuItems= document.querySelectorAll('.header__menu-item');
const menuIcon=document.querySelector('.header__menu-button-personal');
const formValidator = new FormValidator();

const popup = new Popup(formValidator);

document.querySelector('.header__menu-button-personal').addEventListener('click', menuToggle);
document.querySelector('.header__auth-button').addEventListener('click', logout);


function popupShow(event) {
  popup.showLoginPopup();
}

function menuToggle() {
  menuItems.forEach((item) => item.classList.toggle("header__mobile-menu_personal"));
  menuIcon.classList.toggle("header__menu-button_close-personal");
}

function logout() {
  if (document.querySelector('.header__auth-button_logged')) {
    document.querySelector('.header__container').classList.remove("header__container_logged");
    document.querySelector('.header__auth-button').classList.remove("header__auth-button_logged");
    document.querySelector('.header__saved-link').textContent = "";
    location.href = "../../";
    document.querySelector('.header__auth-button').textContent = "Авторизоваться";
  }
}
