const Schedule = require("../../domain/schedule");
class ScheduleFinder {
    constructor(repositoryDay) {
        this.repository = repositoryDay;
    }
    async call(idLocal) {
        return new Schedule( await this.repository.list(idLocal));
    }
}

module.exports = ScheduleFinder;
