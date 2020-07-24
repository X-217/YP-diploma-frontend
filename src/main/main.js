import './main.css';

import SignupPopup from "../JS/SignupPopup";
import FormValidator from "../JS/FormValidator";

const signupPopup = new SignupPopup();
const formValidator = new FormValidator();

document.querySelector('.header__auth-button').addEventListener('click', mainPopupShow);

function mainPopupShow(event) {
  signupPopup.open()

}
