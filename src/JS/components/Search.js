'use strict';
import {IMAGE_PLACEHOLDER_LINK} from "../../../../YP-diploma-frontend — копия (3)/src/JS/constants/links/cards";
import {CARDS_OUTPUT_SIMULTANEOUSLY} from "../../../../YP-diploma-frontend — копия (3)/src/JS/constants/params/search-output-params";

export default class Search {
  constructor(newsApi, newsCardList) {
    this.newsApi = newsApi;
    this.preloader=document.querySelector(".results__preloader");
    this.notFound = document.querySelector(".results__notfound");
    this.resultsTitle=document.querySelector(".results__title");
    this.resultsOutput = document.querySelector(".results__output");
    this.resultsButton = document.querySelector(".results__button");
    this.resultsContainer = document.querySelector(".results__container");
    this.searchInput=document.querySelector(".search__input");
    this.searchSubmitButton=document.querySelector(".search__submit");
    this.total = 0;
    this.articles= [];
    this.lastArticle=0;
    this.newsCardList = newsCardList;
    this._showArticles=this._showArticles.bind(this)
  };

  startSearch(request) {
    this.newsCardList.clear();
    this.total = 0;
    this.articles = [];
    this.lastArticle = 0;
    this._setEventListeners();
    this.notFound.classList.remove("results__notfound_is-visible");
    this.resultsTitle.classList.remove("results__title_is-visible");
    this.resultsOutput.classList.remove("results__output_is-visible");
    this.resultsButton.classList.remove("results__button_is-visible");
    this.searchInput.setAttribute("disabled", true);
    this.searchSubmitButton.setAttribute("disabled", true);
    this.preloader.classList.add("results__preloader_is-visible");

    this.newsApi.getNews(request)
      .then((res) => {
        this.total = res.totalResults; /* получено статей */
        this.articles = res.articles;    /* массив статей */
        this.articles.forEach((item) => {
          item.keyword = request
        });
        this.articles.forEach((item) => {
          item.id = ''
        });
        this.searchInput.removeAttribute("disabled");
        this.searchSubmitButton.removeAttribute("disabled");
        this.preloader.classList.remove("results__preloader_is-visible");
        if (!this.total) this.notFound.classList.add("results__notfound_is-visible");
        if (this.total) {
          this.resultsTitle.classList.add("results__title_is-visible");
          this.resultsOutput.classList.add("results__output_is-visible");
          this.resultsButton.classList.add("results__button_is-visible");
          this.resultsContainer.classList.remove("results__container_is-empty");
          this._showArticles()
        }
      })
      .catch((err) => {
        alert(err)
      });
  }

  _showArticles() {
  for (let i = this.lastArticle; i < (this.lastArticle + CARDS_OUTPUT_SIMULTANEOUSLY); i++) {
    if (i < this.total) {
      this.newsCardList.addCardSearch({
        keyword: this.articles[i].keyword.toString() || "*",
        date: this.articles[i].publishedAt.slice(0, 10) || Date.now(),
        title: this.articles[i].title.toString() || "*",
        text: this.articles[i].description.slice(0, 128) || "*",
        source: this.articles[i].source.name.toString() || "*",
        image: this.articles[i].urlToImage || IMAGE_PLACEHOLDER_LINK,
        url: this.articles[i].url.toString() || "https://ya.ru/",
        id: i,
      })
    }
    if (i === (this.total-1)) {
      this.resultsButton.classList.remove("results__button_is-visible");
    }
  }
    this.lastArticle = this.lastArticle + CARDS_OUTPUT_SIMULTANEOUSLY;
  }

  _setEventListeners() {
    this.resultsButton.addEventListener('click', this._showArticles)
  }
}

