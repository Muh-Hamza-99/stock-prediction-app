const express = require("express");
const router = express.Router();

const {
    getOneKey,
    createKey,
    deleteKey,
    getStockPrediction
} = require("../controllers/key-controllers");

const protect = require("../middleware/protect");
const getMe = require("../middleware/get-me");
const predictionResponse = require("../middleware/prediction-response");

router
    .route("/")
    .post(protect, getMe, createKey);

router
    .route("/:id")
    .get(getOneKey)
    .delete(protect, getMe, deleteKey);

router.get("/:id/predict", protect, getMe, getStockPrediction, predictionResponse)

module.exports = router;