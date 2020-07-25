import './main.css';


import LoginPopup from "../JS/LoginPopup";
import SignupPopup from "../JS/SignupPopup";
import SuccessPopup from "../JS/SuccessPopup";
import FormValidator from "../JS/FormValidator";



const menuItems= document.querySelectorAll('.header__menu-item');
const header=document.querySelector('.header');
const menuIcon=document.querySelector('.header__menu-button');



const formValidator = new FormValidator();
const loginPopup = new LoginPopup(formValidator);
const signupPopup = new SignupPopup(formValidator);
const successPopup = new SuccessPopup();

/*document.querySelector('.header__auth-button').addEventListener('click', signupPopupShow);*/
/*document.querySelector('.header__auth-button').addEventListener('click', loginPopupShow);*/
document.querySelector('.header__auth-button').addEventListener('click', successPopupShow);
document.querySelector('.header__menu-button').addEventListener('click', menuToggle);



function loginPopupShow(event) {
  loginPopup.open();
}
function signupPopupShow(event) {
  signupPopup.open();
}

function successPopupShow(event) {
  successPopup.open();
}

function menuToggle() {
    menuItems.forEach((item) => item.classList.toggle("header__mobile-menu"));
    header.classList.toggle("header__blur");
    menuIcon.classList.toggle("header__menu-button_close");
}

