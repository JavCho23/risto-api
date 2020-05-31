class PersonalAdder {
    constructor(repository) {
        this.repository = repository;
    }
    call(idLocal, idPersonal, idUser) {
        return this.repository.add(idLocal, idPersonal, idUser);
    }
}

module.exports = PersonalAdder;
