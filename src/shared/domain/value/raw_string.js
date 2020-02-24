class RawString {
  constructor(value) {
    this.value = value;
  }

  get value() {
    return this.value;
  }
  toString() {
    this.value.toString();
  }
}

module.exports = RawString;
