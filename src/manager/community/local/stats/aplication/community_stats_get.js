class CommunityStatsGet {
    constructor(repository) {
        this.repository = repository;
    }
    call(localId) {
        return this.repository.getCommunityStats(localId);
    }
}

module.exports = CommunityStatsGet;
