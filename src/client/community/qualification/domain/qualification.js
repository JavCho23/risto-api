class Qualification {
    constructor(id_qualification, name, scores){
        this._id = id_qualification;
        this._personName =  name;
        this._scores = scores;
    }

    toJson(){
        return {
            id: this._id.value,
            personName: this._personName.value,
            scores: this._scores.map( score =>{ return score.toJson();} )
        };
    }
    
}

module.exports = Qualification;