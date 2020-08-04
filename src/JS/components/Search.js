'use strict';
import {IMAGE_PLACEHOLDER_LINK} from "../constants/links/cards";

export default class Search {
  constructor(newsApi, newsCardList) {
    this.newsApi = newsApi;
    this.preloader=document.querySelector(".results__preloader");
    this.notFound = document.querySelector(".results__notfound");
    this.resultsTitle=document.querySelector(".results__title");
    this.resultsOutput = document.querySelector(".results__output");
    this.resultsButton = document.querySelector(".results__button");
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
        this.preloader.classList.remove("results__preloader_is-visible");
        if (!this.total) this.notFound.classList.add("results__notfound_is-visible");
        if (this.total) {
          this.resultsTitle.classList.add("results__title_is-visible");
          this.resultsOutput.classList.add("results__output_is-visible");
          this.resultsButton.classList.add("results__button_is-visible");
          this._showArticles()
        }
      })
      .catch((err) => {
        alert(err)
      });
  }


  _showArticles() {
  for (let i = this.lastArticle; i < this.lastArticle + 3; i++) {
    if (i < this.total) this.newsCardList.addCard({
      keyword: this.articles[i].keyword.toString(),
      date: this.articles[i].publishedAt.slice(0, 10),
      title: this.articles[i].title.toString(),
      text: this.articles[i].description.slice(0, 128),
      source: this.articles[i].source.name.toString(),
      image: (this.articles[i].urlToImage || IMAGE_PLACEHOLDER_LINK).toString(),
      url: this.articles[i].url.toString(),
/*      id: this.articles[i].id,*/
    });
  }
    this.lastArticle = this.lastArticle + 3;
  }

  _setEventListeners() {
    this.resultsButton.addEventListener('click', this._showArticles)
  }

  _removeEventListeners() {
    this.resultsButton.removeEventListener('click', this._showArticles)
  }


}

