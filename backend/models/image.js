const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  photo: { type: String, required: true }, // Cloudinary URL
});

module.exports = mongoose.model('Image', imageSchema);