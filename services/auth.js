const bcrypt = require('bcrypt');
const saltRounds = Number.parseInt(process.env.SALT);


const generateHash = async(pwd) => {
    let salt = await bcrypt.genSalt(saltRounds);
    let hash = await bcrypt.hash(pwd, salt);
    return { hash, salt };
}

module.exports = {
    generateHash,
}