const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: "Earth",
    orderFromSun: 3,
    hasRings: false
});

const Planets = mongoose.model('Planets', schema);

module.exports = Planets;