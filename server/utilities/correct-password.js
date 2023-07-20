const bcrypt = require("bcryptjs");

const correctPassword = async (providedPassword, userPassword) => {
    return await bcrypt.compare(providedPassword, userPassword);
};

module.exports = correctPassword;