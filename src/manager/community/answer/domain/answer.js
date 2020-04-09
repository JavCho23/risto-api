
class Answer{
    constructor(askId,managerId,text){
        this._askId = askId;
        this._managerId = managerId;
        this._text = text;
    }
    toJson(){
        return {
            id_ask:this._askId,
            id_manager: this._managerId,
            text: this._text
        }
    }
}

module.exports = Answer;