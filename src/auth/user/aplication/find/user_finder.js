class UserFinder {
  constructor(repository) {
    this.repository = repository;
  }
  call(user, app) {
    if (app == "manager") return this.repository.findManager(user);

    return this.repository.find(user);
  }
}

module.exports = UserFinder;
