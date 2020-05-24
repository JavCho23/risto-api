class ProductRater {
  constructor(repository) {
    this.repository = repository;
  }
  call(idProduct, idUser, score, itemRateCalculater) {
    return this.repository.rate(idProduct, idUser, score, itemRateCalculater);
  }
}

module.exports = ProductRater;
