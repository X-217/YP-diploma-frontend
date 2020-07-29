import './main.css';

import Popup from "../JS/components/Popup";
import FormValidator from "../JS/FormValidator";
import Header from "../JS/components/Header";

const menuItems= document.querySelectorAll('.header__menu-item');
/*const header=document.querySelector('.header');*/
const menuIcon=document.querySelector('.header__menu-button');
const formValidator = new FormValidator();
const header = new Header();
const popup = new Popup(formValidator,header);


document.querySelector('.header__auth-button').addEventListener('click', popupShow);
document.querySelector('.header__menu-button').addEventListener('click', menuToggle);
document.querySelector('.header__auth-button').addEventListener('click', logout);


function popupShow(event) { /*сменить название*/
  popup.open(); /*если пользователь не авторизован*/
  /*если авторизован, то logout без открытия попапа*/
}

function menuToggle() {
    menuItems.forEach((item) => item.classList.toggle("header__mobile-menu"));
  document.querySelector('.header').classList.toggle("header__blur");
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
