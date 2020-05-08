class Local {
  constructor(
    id,
    name,
    description,
    location,
    folows,
    phones,
    schedule,
    payments
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._location = location;
    this._folows = folows;
    this._phones = phones;
    this._schedule = schedule;
    this._payments = payments;
  }
  toJson() {
    return {
      idLocal: this._id.value,
      name: this._name.value,
      description: this._description.value,
      location: this._location.toJson(),
      folows: this._folows.value,
      phones: this._phones.map((phone) => phone.toJson()),
      schedule: this._schedule.toJson(),
      payments: this._payments.map((payment) => payment.id.value),
    };
  }
}

module.exports = Local;
