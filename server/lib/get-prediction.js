const { execSync } = require("child_process");
const { existsSync } = require("fs");

const getPrediction = (stockName, daysFromNow) => {
    const pathname = `${process.cwd()}/lib/models/${stockName}-model.py`;
    if(!existsSync(pathname)) return undefined;
    const processResult = execSync(`python ${pathname} ${String(Number(daysFromNow) + 251) }`);
    return processResult.toString();
};

module.exports = getPrediction;