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
  get distance(latitude, longitude) {
    radianes = function (x) {
      return (x * Math.PI) / 180;
    };
    const R = 6378.137;
    var distanceLat = radianes(latitude - this._latitude);
    var distanceLong = radianes(longitude - this._longitude);
    var a =
      Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
      Math.cos(radianes(this.latitude)) *
        Math.cos(radianes(latitude)) *
        Math.sin(distanceLong / 2) *
        Math.sin(distanceLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
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
