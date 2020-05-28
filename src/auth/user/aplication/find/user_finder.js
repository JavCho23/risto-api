class UserFinder {
  constructor(repository) {
    this.repository = repository;
  }
  call(userId, app) {
    if (app == "manager") return this.repository.findManager(userId);

    return this.repository.find(userId);
  }
}

module.exports = UserFinder;
