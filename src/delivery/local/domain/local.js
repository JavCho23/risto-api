const RawString = require("../../../shared/domain/value/raw_string");
const RawNumber = require("../../../shared/domain/value/raw_double");
const Location = require("../../location/domain/location");
const Phone = require("../../phone/domain/phone");
const Schedule = require("../../schedule/domain/schedule");
const Uuid = require("../../../shared/domain/value/uuid");
class Local {
    constructor(
        id,
        name,
        description,
        category,
        deliveryPrice,
        location,
        folows,
        phones,
        schedule,
        payments
    ) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._category = category;
        this._deliveryPrice = deliveryPrice;
        this._location = location;
        this._folows = folows;
        this._phones = phones;
        this._schedule = schedule;
        this._payments = payments;
    }
    static fromJson(local) {
        return new this(
            new Uuid(local.idLocal),
            new RawString(local.name),
            new RawString(local.description),
            new RawString(""),
            new RawNumber(local.deliveryPrice),
            Location.fromJson(local.location),
            0,
            local.phones.map((phone) => Phone.fromJson(phone)),
            Schedule.fromJson(local.schedule),
            local.payments.map((payment) => new Uuid(payment))
        );
    }
    get idLocal() {
        return this._id;
    }
    get description() {
        return this._description;
    }
    get name() {
        return this._name;
    }
    get category() {
        return this._category;
    }
    get deliveryPrice() {
        return this._deliveryPrice;
    }
    get location() {
        return this._location;
    }
    get phones() {
        return this._phones;
    }
    get schedule() {
        return this._schedule;
    }
    get payments() {
        return this._payments;
    }

    toJson() {
        return {
            idLocal: this._id.value,
            name: this._name.value,
            status: this._schedule.status,
            description: this._description.value,
            category: this._category.value,
            deliveryPrice: this._deliveryPrice.value,
            location: this._location.toJson(),
            follows: this._folows.value,
            phones: this._phones.map((phone) => phone.toJson()),
            schedule: this._schedule.toJson(),
            payments: this._payments.map((payment) => payment.toJson()),
        };
    }
}

module.exports = Local;
