const RawString = require("../../../shared/domain/value/raw_string");
const RawNumber = require("../../../shared/domain/value/raw_double");
const Uuid = require("../../../shared/domain/value/uuid");

class Order {
    constructor(id, name, amount, price, score) {
        this._id = id;
        this._name = name;
        this._amount = amount;
        this._price = price;
        this._score = score;
    }
    static fromJson(order) {
        return new this(
            new Uuid(order.idProduct),
            new RawString(""),
            new RawNumber(order.amount),
            new RawNumber(order.price),
            new RawNumber(0)
        );
    }
    get idProduct() {
        return this._id;
    }
    get amount(){
        return this._amount;
    }
    get price(){
        return this._price;
    }
    toJson() {
        return {
            idProduct: this._id.value,
            name: this._name.value,
            amount: this._amount.value,
            price: this._price.value,
            score: this._score.value,
        };
    }
}

module.exports = Order;
