const formatResponse = (code, msg, data = null) => {
    return {
        code,
        msg,
        data
    };
};

const handleDataPattern = function(data){
    const arr = [];
    for(const i of data){
        arr.push(i.dataValues);
    }
    return arr;
}

module.exports = {
    formatResponse,
    handleDataPattern
};
