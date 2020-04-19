
exports.calculateRanting = (scores) => {
    if(scores.length <= 0) return 0; 
    return scores.reduce((previous,current)=> previous.amount.value + current.amount.value) / scores.length;  
};

