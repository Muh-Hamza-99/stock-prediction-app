const JWT = require("jsonwebtoken");

const prisma = require("../database/prisma");

const hashPassword = require("../utilities/hash-password");
const correctPassword  = require("../utilities/correct-password");
const catchAsync = require("../utilities/catch-async");
const AppError = require("../utilities/app-error");
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime/library");

const signToken = id => JWT.sign({id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRES_IN });

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.id);
    user.password = undefined;
    res.status(statusCode).json({ token });
};

const register = catchAsync(async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return next(new AppError("Missing username/password!", 403));
        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({ data: { username, password: hashedPassword } });
        createSendToken(user, 201, res);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
            res.status(403).json({ status: "fail", message: "Username is already taken by someone else!" });
        };
    };
}); 

const login = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) return next(new AppError("Missing username/password!", 403));
    const user = await prisma.user.findFirst({ where: { username } });
    if (!user || !(await correctPassword(password, user.password))) return next(new AppError("No user exists with the given credentials!", 404));
    createSendToken(user, 200, res);
});

module.exports = {
    register,
    login,
};