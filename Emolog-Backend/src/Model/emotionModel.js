const { DataTypes } = require('sequelize');
const db = require('../config/db');  // Pastikan db.js sudah dikonfigurasi dengan benar

// Definisikan model emotion
const Emotion = db.define('Emotion', {
  emotionType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Export model Emotion
module.exports = Emotion;
