const prisma = require("../database/prisma");

const catchAsync = require("../utilities/catch-async");
const generateAPIKey = require("../utilities/generate-api-key");
const AppError = require("../utilities/app-error");

const getPrediction = require("../lib/get-prediction");

const getOneKey = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const key = await prisma.key.findUnique({ where: { id }, include: { requests: true } });
    if (!key) return next(new AppError("No key with the provided ID", 404));
    res.status(200).json({ key });
});

const createKey = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const { label } = req.body;
    if (!userId) return next(new AppError("Not authenaticated!", 403));
    if (!label) return next(new AppError("Insufficient data!", 403));
    const id = generateAPIKey();
    const key = await prisma.key.create({ data: { id, userId, label } });
    res.status(200).json({ key });
});

const deleteKey = catchAsync(async (req, res, next) => {
    const { userId, id } = req.params;
    const key = await prisma.key.delete({ where: { id, userId } });
    if (!key) return next(new AppError("No key with the provided ID", 404));
    res.status(200).json({ message: "success" });
});

const getStockPrediction = catchAsync(async (req, res, next) => {
    const { userId, id } = req.params;
    const key = await prisma.key.findUnique({ where: { id, userId }});
    if (!key) {res.status(404).json({ message: "This key isn't in your keys!" }); next();};
    const { stockName, daysFromNow } = req.query;
    if (!stockName || !daysFromNow) {res.status(403).json({ message: "Missing query paramters!" }); next();};
    const prediction = getPrediction(stockName, daysFromNow);
    if (!prediction) {res.status(404).json({ message: `${stockName} doesn't exist in our database!|404` }); next();};
    res.status(200).json({ status: "success", prediction: prediction.replace("\r", "").replace("\n", "") });
    next();
})

module.exports = {
    createKey,
    getOneKey,
    deleteKey,
    getStockPrediction,
};