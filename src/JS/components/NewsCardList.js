'use strict';

export default class NewsCardList {
  constructor(cardContainer, newsCard, type) {
    this.cardContainer = cardContainer;
    this.newsCard = newsCard;
    this.type = type;
  };

  addCard(item) {
    this.newsCard.create(item, this.cardContainer, this.type);
  };

  clear() {
    while (this.cardContainer.firstChild) {
      this.cardContainer.removeChild(this.cardContainer.firstChild);
    }
  }

  /*
    render(initialCards) {
      initialCards.forEach(item => this.addCard(item));
    };*/
};
