class NotificationLister {
  constructor(repository) {
    this.repository = repository;
  }
  call(idUser) {
    return this.repository.list(idUser);
  }
}

module.exports = NotificationLister;
