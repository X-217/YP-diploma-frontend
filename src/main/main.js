import './main.css';

import Popup from "../JS/Popup";
import FormValidator from "../JS/FormValidator";

const menuItems= document.querySelectorAll('.header__menu-item');
const header=document.querySelector('.header');
const menuIcon=document.querySelector('.header__menu-button');
const formValidator = new FormValidator();

const popup = new Popup(formValidator);

document.querySelector('.header__auth-button').addEventListener('click', popupShow);
document.querySelector('.header__menu-button').addEventListener('click', menuToggle);
document.querySelector('.header__auth-button').addEventListener('click', logout);


function popupShow(event) {
  popup.checkoutLogin();
}

function menuToggle() {
    menuItems.forEach((item) => item.classList.toggle("header__mobile-menu"));
    header.classList.toggle("header__blur");
    menuIcon.classList.toggle("header__menu-button_close");
}

function logout() {
  if (document.querySelector('.header__auth-button_logged')) {
    document.querySelector('.header__container').classList.remove("header__container_logged");
    document.querySelector('.header__auth-button').classList.remove("header__auth-button_logged");
    document.querySelector('.header__auth-button').textContent = "Авторизоваться";
    document.querySelector('.header__saved-link').textContent = "";
    location.href = './index.html'
  }
}
