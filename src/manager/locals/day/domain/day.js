class Day{
    constructor(day, opening, closing){
        this._day  = day ;
        this._opening = opening;
        this._closing = closing;
    }
    toJson(){
        return{
            day:this._day.value,
            opening:this._opening.value,
            closing: this._closing.value
        }
    }  
}

module.exports = Day;