import './main.css';

import MainApi from "../JS/api/MainApi";
import Header from "../JS/components/Header";
import Popup from "../JS/components/Popup";
import FormValidator from "../JS/utils/FormValidator";
import Form from "../JS/components/Form";
import Search from "../JS/components/Search";
import NewsCard from "../JS/components/NewsCard";
import NewsCardList from "../JS/components/NewsCardList";
import NewsApi from "../JS/api/NewsApi";
import {BAD_REQUEST} from "../JS/constants/text/search-form-messages";

const cardContainer= document.querySelector(".results__output");

const mainApi = new MainApi();
const newsApi = new NewsApi();
const header = new Header();
const popup = new Popup();
const formValidator = new FormValidator();
const form = new Form(mainApi, popup, header, formValidator);
const newsCard = new NewsCard(mainApi);

const newsCardList = new NewsCardList(cardContainer, newsCard);
const search = new Search(newsApi, newsCardList);

const menuItems = document.querySelectorAll('.header__menu-item');
const menuIcon = document.querySelector('.header__menu-button');
const authButton = document.querySelector('.header__auth-button');
const menuButton = document.querySelector('.header__menu-button');
const searchButton = document.querySelector('.search__submit');
const searchInput = document.querySelector('.search__input');



mainApi.getUserData()
  .then((res) => {
    header.render(res.name);
    setEventListeners();
  })
  .catch((err) => {
    header.render(false);
    alert(err.message);
  });

searchInput.setCustomValidity(BAD_REQUEST);

function setEventListeners() {
  authButton.addEventListener('click', authToggle);
  menuButton.addEventListener('click', menuToggle);
  searchButton.addEventListener('click', startSearch)

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

 function startSearch(event) {

   if ((!searchInput.validity.patternMismatch) && (searchInput.value)) {
     event.preventDefault();
     event.stopImmediatePropagation();
     search.startSearch(searchInput.value);
   } else {

   };

}
