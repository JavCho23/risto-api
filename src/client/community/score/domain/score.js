class Score {
    constructor( name, amount){
        this._typeName =  name;
        this._amount = amount;
    }
    toJson(){
        return {
            category: this._typeName.value,
            amount: this._amount.value
        };
    }
}

module.exports = Score;