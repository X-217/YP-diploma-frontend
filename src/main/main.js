import './main.css';

import SignupPopup from "../JS/SignupPopup";
import FormValidator from "../JS/FormValidator";

const signupPopup = new SignupPopup();
const formValidator = new FormValidator();
const menuItems= document.querySelectorAll('.header__menu-item');
const menuLogo= document.querySelector('.header__logo');
const menuMobile= document.querySelector('.header__mobile-control');


document.querySelector('.header__auth-button').addEventListener('click', mainPopupShow);
document.querySelector('.header__mobile-control').addEventListener('click', expandMenu);



function mainPopupShow(event) {
  signupPopup.open()
}

function expandMenu() {
  menuItems.forEach((item) => item.classList.add("header__mobile-menu"));
/*  menuLogo.style.backgroundColor="#1A1B22";
  menuMobile.style.backgroundColor="#1A1B22";
  menuMobile.style.backgroundImage="url(../../../images/header/menu-close_white.svg)";*/


}
