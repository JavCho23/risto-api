class Payment{
    constructor(id, name, description){
        this._id  = id ;
        this._name = name;
        this._description = description;
    }
    get id(){
        return this._id;
    }

    toJson(){
        return {
            idPayment: this._id.value,
            name: this._name.value,
            description: this._description.value,
        }
    }
    
}

module.exports = Payment;