class Delivery {
    constructor(
        id,
        idLocal,
        local,
        date,
        name,
        status,
        location,
        orders,
        price,
        total,
        payment
    ) {
        this._id = id;
        this._idLocal = idLocal;
        this._local = local;
        this._name = name;
        this._location = location;
        this._orders = orders;
        this._date = date;
        this._status = status;
        this._price = price;
        this._total = total;
        this._payment = payment;
    }
    get idDelivery() {
        return this._id;
    }
    get idLocal() {
        return this._idLocal;
    }
    get name() {
        return this._name;
    }
    get location() {
        return this._location;
    }
    get orders() {
        return this._orders;
    }
    get price() {
        return this._price;
    }
    get payment() {
        return this._payment;
    }
    get total() {
        return this._total;
    }
    toJson() {
        return {
            idDelivery: this._id.value,
            idLocal: this._idLocal.value,
            local: this._local.value,
            date: Date.parse(this._date.value),
            name: this._name.value,
            status: this._status.toJson(),
            location: this._location.toJson(),
            orders: this._orders.map((order) => order.toJson()),
            price: this._price.value,
            payment: this._payment.toJson(),
        };
    }
}

module.exports = Delivery;
