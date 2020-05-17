class ProductRater {
  constructor(repository) {
    this.repository = repository;
  }
  call(idProduct, idUser, score) {
    return this.repository.rate(idProduct, idUser, score);
  }
}

module.exports = ProductRater;
