
class Ask {
    constructor(idAsk,text,date, answers) {
        this._id = idAsk;
        this._text = text;
        this._date = date;
        this._answers = answers;
    }

    toJson() {
        return {
            id: this._id,
            text: this._text,
            date: this._date,
            answers: this._answers.map(answer => answer.toJson())
        };
    }
}

module.exports = Ask;
