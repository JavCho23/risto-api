class ScheduleUpdater {
    constructor(repositoryDay) {
        this.repository = repositoryDay;
    }
    async call(idSchedule, schedule) {
        return await Promise.all(
            schedule.days.map(
                async (day) => await this.repository.update(idSchedule, day)
            )
        );
    }
}

module.exports = ScheduleUpdater;
