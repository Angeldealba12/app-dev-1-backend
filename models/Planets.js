const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: "string",
    orderFromSun: "number",
    hasRings: "boolean"
});

const Planets = mongoose.model('Planets', schema);

module.exports = Planets;
