const Profile = require("../../domain/profile");

class ProfileUpdater {
    constructor(repository) {
        this.repository = repository;
    }
    call(profile, locationUpdater) {
        return this.repository.update(Profile.fromJson(profile), locationUpdater);
    }
}

module.exports = ProfileUpdater;
