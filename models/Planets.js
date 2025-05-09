const mongoose = require('mongoose');
const conn = mongoose.createConnection(process.env.MONGODB_URI_GUIDES); // Update if using a different URI

const planetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    orderFromSun: { type: Number, required: true },
    hasRings: { type: Boolean, required: true }
});

module.exports = conn.model('Planets', planetSchema);
