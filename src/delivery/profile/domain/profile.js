const RawString = require("../../../shared/domain/value/raw_string");
const Location = require("../../location/domain/location");
const Uuid = require("../../../shared/domain/value/uuid");
class Profile {
    constructor(id, name, phone, location) {
        this._id = id;
        this._name = name;
        this._phone = phone;
        this._location = location;
    }
    static fromJson(profile) {
        return new this(
            new Uuid(profile.idProfile),
            new RawString(profile.name),
            new RawString(profile.phone),
            Location.fromJson(profile.location)
        );
    }
    get idProfile() {
        return this._id;
    }
    get phone() {
        return this._phone;
    }
    get name() {
        return this._name;
    }
    get location() {
        return this._location;
    }
    toJson() {
        return {
            idLocal: this._id.value,
            name: this._name.value,
            status: this._schedule.status,
            phone: this._phone.value,
            location: this._location.toJson(),
        };
    }
}

module.exports = Profile;
