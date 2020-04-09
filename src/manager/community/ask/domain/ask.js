
class Ask {
    constructor(idAsk,text,date) {
        this._id = idAsk;
        this._text = text;
        this._date = date;
    }

    toJson() {
        return {
            id: this._id,
            text: this._text,
            date: this._date
        };
    }
}

module.exports = Ask;
