'use strict';

export default class NewsCardList {
  constructor(cardContainer, newsCard) {
    this.cardContainer = cardContainer;
    this.newsCard = newsCard;
  };

  addCard(item) {
    this.newsCard.create(item, this.cardContainer);
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
