import './main.css';

import Form from "../JS/components/Form";
import Popup from "../JS/components/Popup";

import Header from "../JS/components/Header";
import MainApi from "../JS/api/MainApi";

const menuItems = document.querySelectorAll('.header__menu-item');

const menuIcon = document.querySelector('.header__menu-button');

const header = new Header();
const form = new Form(header);
const popup = new Popup(form);
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

/* https://learn.javascript.ru/promise-error-handling */
window.addEventListener('unhandledrejection', function(event) {
  // объект события имеет два специальных свойства:
  alert(event.promise); // [object Promise] - промис, который сгенерировал ошибку
  alert(event.reason); // Error: Ошибка! - объект ошибки, которая не была обработана
});
/**/
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
