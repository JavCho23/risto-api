const Local = require("../../domain/local");

class LocalUpdater {
  constructor(repository) {
    this.repository = repository;
  }
  call(
    local,
    phoneLister,
    paymentsLister,
    locationUpdater,
    scheduleUpdater,
    phoneUpdater,
    phoneAdder,
    phoneRemover
  ) {
    return this.repository.update(
      Local.fromJson(local),
      phoneLister,
      paymentsLister,
      locationUpdater,
      scheduleUpdater,
      phoneUpdater,
      phoneAdder,
      phoneRemover
    );
  }
}

module.exports = LocalUpdater;
