class Score {
    constructor( name, amount){
        this._category =  name;
        this._amount = amount;
    }
    toJson(){
        return {
            category: this._category.value,
            amount: this._amount.value
        };
    }
    get category(){
        return this._category;
    }
    get amount(){
        return this._amount;
    }
}

module.exports = Score;