

exports.calculateRanting = (scores) => {
    return scores.reduce((previous,current)=> previous.amount.value + current.amount.value,0) / scores.length;  
};

