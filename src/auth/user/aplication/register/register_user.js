const User = require("../../domain/user");
const UserName = require("../../domain/value/user_name");
const UserPhoto = require("../../domain/value/user_photo");
const UserEmail = require("../../domain/value/user_email");


class RegisterUser {
    constructor(repository) {
        this._repository = repository;
    }
    async call(dataUser) {
        return this._repository.register(dataUser);
    }

}

module.exports = RegisterUser;
