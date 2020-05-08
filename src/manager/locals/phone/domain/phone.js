class Phone{
    constructor(label, number){
        this._label  = label ;
        this._number = number;
    }

    toJson(){
        return {
            label: this._label.value,
            number: this._number.value
        }
    }
}

module.exports = Phone;