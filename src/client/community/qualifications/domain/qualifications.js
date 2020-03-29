class Qualifications {
    constructor(summary,comments){
        this._summary  = summary;
        this._comments = comments;
    }
    
    toJson(){
        return { 
            summary : this._summary.toJson(),
            comments: this._comments.map( comment => comment.toJson())
        };
    }
}

module.exports = Qualifications;