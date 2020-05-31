class Notification {
    constructor(idNotification, idDelivery, event, date, checked) {
        this._id = idNotification;
        this._idDelivery = idDelivery;
        this._event = event;
        this._description = description;
        this._date = date;
        this._checked = checked;
    }
    get id() {
        return this._id;
    }
    get idDelivery() {
        return this._idDelivery;
    }
    get event() {
        return this._event;
    }

    get date() {
        return this._date;
    }
    get checked() {
        return this._checked;
    }

    toJson() {
        return {
            idNotification: this.id.value,
            title: this._event.title.value,
            message: this._event.message.value,
            date: Date.parse(this._date.value),
            isChecked: this._checked.value,
            path: "deliverys?id=" + this.idDelivery.value,
        };
    }
}

module.exports = Notification;
