const Profile = require("../../domain/profile");

class ProfileAdder {
  constructor(repository) {
    this.repository = repository;
  }
  call(idUser, profile, locationUpdater) {
    return this.repository.add(
      idUser,
      Profile.fromJson(profile),
      locationUpdater
    );
  }
}

module.exports = ProfileAdder;
