import './main.css';

import Popup from "../JS/components/Popup";
import FormValidator from "../JS/FormValidator";
import Header from "../JS/components/Header";
import MainApi from "../JS/api/MainApi";

const menuItems = document.querySelectorAll('.header__menu-item');
/*const header=document.querySelector('.header');*/
const menuIcon = document.querySelector('.header__menu-button');
const formValidator = new FormValidator();
const header = new Header();
const popup = new Popup(formValidator, header);
const authButton = document.querySelector('.header__auth-button');
const menuButton = document.querySelector('.header__menu-button');


let islogged = false;

const mainApiParams = {
  baseUrl:  'http://localhost:3000', /*'https://api.x-217.ru/',*/
  headers: {
    'Content-Type': 'application/json',
  }
};
const mainApi = new MainApi(mainApiParams);


authButton.addEventListener('click', authToggle);
menuButton.addEventListener('click', menuToggle);

header.render(false, undefined);

function authToggle(event) {
  if (!islogged) {
    popup.open();
    islogged = true;
    header.render(islogged, "Username");
  } else {
    header.render(islogged, undefined);
    location.href = './index.html'
  }
}

function menuToggle() {
  menuItems.forEach((item) => item.classList.toggle("header__mobile-menu"));
  document.querySelector('.header').classList.toggle("header__blur");
  menuIcon.classList.toggle("header__menu-button_close");
}

function logout() {
  if (document.querySelector('.header__auth-button_logged')) {


  }
}
