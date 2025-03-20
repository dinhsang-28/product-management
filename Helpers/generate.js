module.exports.generateRandomString = (length) => {
    const characters ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789";
    let result = 0;
    for(let i=0;i < length ;i++){
        result += characters.charAt(Math.floor(Math.random()*characters.length));
    }
    return result;
}

module.exports.generateRandomNumber = (length) => {
    const characters ="0123456789";
    let result = 0;
    for(let i=0;i < length ;i++){
        result += characters.charAt(Math.floor(Math.random()*characters.length));
    }
    return result;
}