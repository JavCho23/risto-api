class CommunityStats{
    constructor (likes,score,weekly){
        this._likes  = likes;
        this._score  = score;
        this._weekly = weekly;
    }

    toJson(){
        return {
            likes:this._likes,
            score: this._score,
            weekly: {
                amount: this._weekly.amount,
                increse: this._weekly.increse,
                dataChart: this._weekly.dataChart
            }
        }
    }
}

module.exports = CommunityStats;