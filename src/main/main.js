import './main.css';


import LoginPopup from "../JS/LoginPopup";
import FormValidator from "../JS/FormValidator";



const menuItems= document.querySelectorAll('.header__menu-item');
const header=document.querySelector('.header');
const menuIcon=document.querySelector('.header__menu-button');
const popupUsername=document.querySelector('.popup__item_username');
const popupEmail= document.querySelector('.popup__item_email');
const popupPassword= document.querySelector('.popup__item_password');
const popupTitle= document.querySelector('.popup__title');
const popupButton= document.querySelector('.popup__button');
const popupRedirection= document.querySelector('.popup__offer-link');


const formValidator = new FormValidator();
const loginPopup = new LoginPopup(formValidator);

document.querySelector('.header__auth-button').addEventListener('click', loginPopupShow);
document.querySelector('.header__menu-button').addEventListener('click', menuToggle);



function loginPopupShow(event) {
  loginPopup.open();
}

function menuToggle() {
    menuItems.forEach((item) => item.classList.toggle("header__mobile-menu"));
    header.classList.toggle("header__blur");
    menuIcon.classList.toggle("header__menu-button_close");
}

