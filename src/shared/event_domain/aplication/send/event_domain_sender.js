class EventDomainSender {
  constructor(repository) {
    this.repository = repository;
  }
  call(notification, to) {
    return this.repository.sendNotificationEventDomain(notification, to);
  }
}

module.exports = EventDomainSender;
