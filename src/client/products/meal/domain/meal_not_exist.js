class MealNotExist extends Error {
    constructor() {
        super("Ups!.. Parece que ya se acabaron todo aqui.");
    }
}

module.exports = MealNotExist;