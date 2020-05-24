class NotificationChecker {
  constructor(repository) {
    this.repository = repository;
  }
  call(idNotificaiton) {
    return this.repository.check(idNotificaiton);
  }
}

module.exports = NotificationChecker;
