import './main.css';

import Form from "../JS/components/Form";
import Popup from "../JS/components/Popup";
import FormValidator from "../JS/utils/FormValidator";

import Header from "../JS/components/Header";
import MainApi from "../JS/api/MainApi";

/*import mainApiParams from "../constants/main-api-params";*/

const menuItems = document.querySelectorAll('.header__menu-item');

const menuIcon = document.querySelector('.header__menu-button');

const header = new Header();
const mainApi = new MainApi();

const popup = new Popup();
const formValidator= new FormValidator();
const form = new Form(popup, header, formValidator);
const authButton = document.querySelector('.header__auth-button');
const menuButton = document.querySelector('.header__menu-button');


let islogged = false;




authButton.addEventListener('click', authToggle);
menuButton.addEventListener('click', menuToggle);



mainApi.getUserData()
  .then((res) => {
    if (res) {             /* кука подтверждена */
      header.render(true, res.name);
      islogged = true;

      console.log(res.name);

    } else {
      header.render(false, undefined);
      console.log("Никого...");
      islogged = false;

    }
  })
  .catch((err) => {         /* кука не подтверждена */
console.log(err);
  });

function authToggle(event) {

  if (!islogged) {
    form.show();
    islogged = true;
  } else {
    mainApi.logout()
      .then((res) => {
        if (res) {
          islogged = false;
          header.render(false, undefined);
        }
      })
      .catch((err) => {



      })

/*    location.href = './index.html'*/
  }
}

function menuToggle() {
  menuItems.forEach((item) => item.classList.toggle("header__mobile-menu"));
  document.querySelector('.header').classList.toggle("header__blur");
  menuIcon.classList.toggle("header__menu-button_close");
}

/*function logout() {
  if (document.querySelector('.header__auth-button_logged')) {


  }
}*/
