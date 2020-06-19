const RawString = require("../../../shared/domain/value/raw_string");
const RawDouble = require("../../../shared/domain/value/raw_double");
class Day {
    constructor(day, opening, closing) {
        this._day = day;
        this._opening = opening;
        this._closing = closing;
    }
    static fromJson(day) {
        return new this(
            new RawDouble(day.day),
            new RawString(day.opening),
            new RawString(day.closing)
        );
    }
    get idDay(){
        return this._day;
    }
    get opening() {
        return this._opening;
    }
    get closing() {
        return this._closing;
    }
    toJson() {
        return {
            day: this._day.value,
            opening: this._opening.value,
            closing: this._closing.value,
        };
    }
}

module.exports = Day;
