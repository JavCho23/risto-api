class LocalListerFavorites {
  constructor(repository) {
    this.repository = repository;
  }
  call(idUser, phoneLister, findLocation, scheduleLister, paymentsLister) {
    return this.repository.listFavorites(
      idUser,
      phoneLister,
      findLocation,
      scheduleLister,
      paymentsLister
    );
  }
}

module.exports = LocalListerFavorites;
