const prisma = require("../database/prisma");

const formatQuery = require("../utilities/format-query");

const predictionResponse = async (req, res, next) => {
    const { id } = req.params;
    const { query, originalUrl, headers } = req;
    const { statusCode, statusMessage } = res;
    await prisma.request.create({ data: { keyId: id, message: statusMessage, statusCode: statusCode.toString(), header: headers.authorisation, url: originalUrl, query: formatQuery(query) } });
    next();
};

module.exports = predictionResponse;