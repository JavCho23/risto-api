class Record {
    constructor(id, name, description, date) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._date = date;
    }

    toJson() {
        return {
            id: this._id.value,
            name: this._name.value,
            description: this._description.value,
            date: Date.parse(this._date.value),
        };
    }
}

module.exports = Record;
