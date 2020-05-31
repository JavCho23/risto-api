class AllPersonalLister {
    constructor(repository) {
        this.repository = repository;
    }
    call(idLocal) {
        return this.repository.listAllPersonal(idLocal);
    }
}

module.exports = AllPersonalLister;
