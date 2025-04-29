const mongoose = require('mongoose');

const conn = mongoose.createConnection(process.env.MONGODB_URI_GUIDES);

const schema = new mongoose.Schema({
    name: 'string',
    orderFromSun: 'number',
    hasRings: 'boolean',
});

module.exports = conn.model('Planets', schema);