const mongoose = require('mongoose');
const conn = mongoose.createConnection(process.env.MONGODB_URI_MOVIES); // adjust if needed

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    director: String,
    genre: String,
    releaseYear: Number,
    platform: String
});

module.exports = conn.model('Movies', movieSchema);
