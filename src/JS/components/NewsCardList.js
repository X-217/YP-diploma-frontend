export default class NewsCardList {
  constructor(cardContainer, newsCard) {
    this.cardContainer = cardContainer;
    this.newsCard = newsCard;
  }

  addCardSearch(item) {
    return this.newsCard.createSearchCard(item, this.cardContainer);
  }

  addCardPersonal(item) {
    return this.newsCard.createPersonalCard(item, this.cardContainer);
  }

  clear() {
    while (this.cardContainer.firstChild) {
      this.cardContainer.removeChild(this.cardContainer.firstChild);
    }
  }
}
