const RawString = require("../../../shared/domain/value/raw_string");
const RawDouble = require("../../../shared/domain/value/raw_double");
class Location {
  constructor(address, city, latitude, longitude) {
    this._address = address;
    this._city = city;
    this._latitude = latitude;
    this._longitude = longitude;
  }

  get address() {
    return this._address;
  }

  get city() {
    return this._city;
  }

  get latitude() {
    return this._latitude;
  }

  get longitude() {
    return this._longitude;
  }

  static fromJson(location) {
    return new this(
      new RawString(location.address),
      new RawString(location.city),
      new RawDouble(location.latitude),
      new RawDouble(location.longitude)
    );
  }
  toJson() {
    return {
      address: this._address.value,
      city: this._city.value,
      latitude: this._latitude.value,
      longitude: this._longitude.value,
    };
  }
}

module.exports = Location;
