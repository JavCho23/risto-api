const UserId = require("../../../shared/domain/user_id");
const UserName = require("./value/user_name");
const UserEmail = require("./value/user_email");
const UserPhoto = require("./value/user_photo");

class User {
    constructor(dataUser) {
        this._id = new UserId(dataUser.id);
        this._name = new UserName(dataUser.username);
        this._email = new UserEmail(dataUser.email);
        this._photo = new UserPhoto(dataUser.photo);
    }

    toJson() {
        return {
            id_user: this._id.value,
            username: this._name.value,
            photo: this._photo.value,
            email: this._email.value
        };
    }
}

module.exports = User;
