import './main.css';

import SignupPopup from "../JS/SignupPopup";
import FormValidator from "../JS/FormValidator";

const signupPopup = new SignupPopup();
const formValidator = new FormValidator();
const menuItems= document.querySelectorAll('.header__menu-item');
const header=document.querySelector('.header');
const menuIcon=document.querySelector('.header__menu-button');
const menuCloseIcon=document.querySelector('.header__menu-button_close');
const menuLogo= document.querySelector('.header__logo');
const menuMobile= document.querySelector('.header__mobile-control');


document.querySelector('.header__auth-button').addEventListener('click', mainPopupShow);
document.querySelector('.header__menu-button').addEventListener('click', menuToggle);


/*document.querySelector('.header__mobile-control').addEventListener('click', changeIcon);*/


function mainPopupShow(event) {

  signupPopup.open();
  document.addEventListener('keydown', function (e) {
    if(e.key === 'Escape') {
      signupPopup.close();
          }
  });
}

function menuToggle() {
    menuItems.forEach((item) => item.classList.toggle("header__mobile-menu"));
    header.classList.toggle("header__blur");
    menuIcon.classList.toggle("header__menu-button_close");
}

