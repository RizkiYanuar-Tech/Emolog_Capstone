const express = require("express");
const router = express.Router();
const emotionController = require("../Controller/emotionController");

// Endpoint utama untuk prediksi mood dan saran
router.post("/predict", emotionController.getMood);
router.post("/suggest", emotionController.getSuggestion);


module.exports = router;
