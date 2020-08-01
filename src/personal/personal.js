import './personal.css';



const menuItems= document.querySelectorAll('.header__menu-item');
const menuIcon=document.querySelector('.header__menu-button-personal');


import Header from "../JS/components/Header";
import MainApi from "../JS/api/MainApi";

const header = new Header();

const mainApi = new MainApi();

document.querySelector('.header__menu-button-personal').addEventListener('click', menuToggle);
document.querySelector('.header__auth-button').addEventListener('click', logout);


function menuToggle() {
  menuItems.forEach((item) => item.classList.toggle("header__mobile-menu_personal"));
  menuIcon.classList.toggle("header__menu-button_close-personal");
}

function logout() {
  if (document.querySelector('.header__auth-button_logged')) {
    document.querySelector('.header__container').classList.remove("header__container_logged");
    document.querySelector('.header__auth-button').classList.remove("header__auth-button_logged");
    document.querySelector('.header__saved-link').textContent = "";
    location.href = "../../";
    document.querySelector('.header__auth-button').textContent = "Авторизоваться";
  }
}

mainApi.getUserData()
  .then((res) => {
    if (res) {             /* кука подтверждена */
      header.render(true, res.name);


      console.log(res.name);

    } else {
      header.render(false, undefined);
      console.log("Никого...");


    }
  })
  .catch((err) => {         /* кука не подтверждена */
    console.log(err);
  });
