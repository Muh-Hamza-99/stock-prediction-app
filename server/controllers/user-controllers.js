const prisma = require("../database/prisma");

const catchAsync = require("../utilities/catch-async");
const AppError = require("../utilities/app-error");

const getOneUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id }, include: { keys: true }});
    if (!user) return next(new AppError("No user with the provided ID", 404));
    res.status(200).send({ user });
});

module.exports = {
    getOneUser,
};