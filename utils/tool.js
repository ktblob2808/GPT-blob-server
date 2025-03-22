const formatResponse = (code, msg, data = null) => {
    return {
        code,
        msg,
        data
    };
};

module.exports = {
    formatResponse
};
