import './main.css';

import MainApi from "../JS/api/MainApi";
import Header from "../JS/components/Header";
import Popup from "../JS/components/Popup";
import FormValidator from "../JS/utils/FormValidator";
import Form from "../JS/components/Form";

const mainApi = new MainApi();
const header = new Header();
const popup = new Popup();
const formValidator = new FormValidator();
const form = new Form(popup, header, formValidator);

const menuItems = document.querySelectorAll('.header__menu-item');
const menuIcon = document.querySelector('.header__menu-button');
const authButton = document.querySelector('.header__auth-button');
const menuButton = document.querySelector('.header__menu-button');


mainApi.getUserData()
  .then((res) => {
    header.render(res.name);
    setEventListeners();
  })
  .catch((err) => {
    header.render(false);
    alert(err.message);
  });


function setEventListeners() {
  authButton.addEventListener('click', authToggle);
  menuButton.addEventListener('click', menuToggle);
};


function authToggle(event) {
  if (authButton.classList.contains("header__auth-button_logged")) {
    logout();
  } else {
    form.show();
  }
}

function menuToggle() {
  menuItems.forEach((item) => item.classList.toggle("header__mobile-menu"));
  document.querySelector('.header').classList.toggle("header__blur");
  menuIcon.classList.toggle("header__menu-button_close");
}


function logout() {
  mainApi.logout()
    .then((res) => {
      if (res) location.reload()
    })
    .catch((err) => {
      alert(err.message)
    })
}



/*


initialRender(loggedUser);

function initialRender(loggedUser) {
  header.render(loggedUser);
}


function authToggle(event) {
  console.log(loggedUser);

  if (loggedUser) {

  } else {
    mainApi.logout()
      .then((res) => {
        if (res) location.reload()
      })
      .catch((err) => {
        alert("Хрень какая-то....")
      })

/!*    location.href = './index.html'*!/
  }
}







/!*

function render(isLogged) {
  if (isLogged) {
      header.render(res);
  }

}*!/
*/
