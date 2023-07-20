const fs = require("fs");

const MODELS_DIRECTORY = "./models";

const stockData = fs.readFileSync("./stocks.txt", "utf8").split("\n");
const templateModelCode = fs.readFileSync("./model-template.py", "utf8");

if (!fs.existsSync(MODELS_DIRECTORY)) fs.mkdirSync(MODELS_DIRECTORY);

for (let stock of stockData) {
  const stockName = stock.split(":")[0].replace("\r", "");
  const stockSpecificModelCode = templateModelCode.replace("<STOCK_NAME_GOES_HERE>", stockName);
  if (stockName === "") continue
  fs.writeFileSync(`./models/${stockName}-model.py`, stockSpecificModelCode);
};