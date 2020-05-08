class Product{
    constructor(name, total){
        this._name  = name ;
        this._total = total;
    }
    get name(){
        return this._name;
    }

    get total(){
        return this._total;
    }
    
    
}

module.exports = Product;