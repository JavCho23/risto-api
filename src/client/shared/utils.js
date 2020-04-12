
exports.calculateRanting = (scores) => {
    return scores.reduce((previous,current)=> previous.amount.value + current.amount.value) / scores.length;  
};

