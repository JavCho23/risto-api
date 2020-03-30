

class User {
    constructor(dataUser) {
        this._id = dataUser.idUser;
        this._name = dataUser.name;
        this._email = dataUser.email;
        this._photo = dataUser.photo;
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
