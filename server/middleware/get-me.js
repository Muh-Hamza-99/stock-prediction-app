const getMe = (req, res, next) => {
    req.params.userId = req.user.id;
    next();
};

module.exports = getMe;