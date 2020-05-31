class EventDomain {
    constructor(title, message) {
        this._title = title;
        this._message = message;
    }
    get title() {
        return this._title;
    }
    get message() {
        return this._message;
    }
    toJson() {
        return {
            title: this._title.value,
            body: this._message.value,
            click_action: "FLUTTER_NOTIFICATION_CLICK"
        };
    }
}

module.exports = EventDomain;
