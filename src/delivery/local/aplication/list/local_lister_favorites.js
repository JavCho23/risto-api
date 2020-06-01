class LocalListerFavorites {
  constructor(repository) {
    this.repository = repository;
  }
  call(
    idUser,
    limit,
    offset,
    phoneLister,
    findLocation,
    scheduleLister,
    paymentsLister
  ) {
    return this.repository.listFavorites(
      idUser,
      limit,
      offset,
      phoneLister,
      findLocation,
      scheduleLister,
      paymentsLister
    );
  }
}

module.exports = LocalListerFavorites;
