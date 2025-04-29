// Application dependencies
const express = require('express');
const router = express.Router();
const Planets = require('../models/Planets.js');
const Todos = require("../models/Todos");

// route definitions
router.get('/', getPlanets);
router.post('/', addPlanet);

// Route handlers
async function getPlanets (req, res) {
    try {
        const planets = await Planets.find();
        res.json({ success: true, data: planets});
    } catch(error) {
        console.log(error);
        res.status(500).json({success: false, message: 'Something went wrong!'});
    }
}

async function addPlanet(req, res) {
    const result = await validatePlanetInput(req.body);

    // Validate user input before continuing
    if(!result.valid) {
        return res.status(400).json({success: false, message: result.error});
    }


    const planet = new Planets(result.data);
    const savedPlanet = await planet.save();
    res.json({success: true, data: savedPlanet});
}

async function validatePlanetInput(input, existingPlanetId = null) {
    // input is expected to look like this:
    // {
    //     "_id": ObjectId('ff30d2a3e781873fcb660'),
    //     "name": "Jupiter,
    //     "orderFromSun": 5,
    //     "hasRings": true,
    //     "mainAtmosphere": ["H2", "He", "CH4"],
    //     surfaceTemperatureC: {min: 0, max: 1, mean: 0.5}
    // }
    let {name, orderFromSun, hasRings} = input; // This is called deconstruction

    // Sanitize the name
    name = (typeof name === 'string') ? name.trim() : '';

    if(!name) {
        return {valid: false, error: 'Please enter a valid name.'};
    }

    // Validate orderFromSun is a number
    if(!Number.isInteger(orderFromSun)) {
        return {valid: false, error: 'orderFromSun is not a valid number.'};
    }
    // Validate orderFromSun is at least 1
    if(orderFromSun <= 0) {
        return {valid: false, error: 'orderFromSun must be greater than 0.'};
    }
    // Validate orderFromSun doesn't exist
    const existing = await Planets.findOne({
        orderFromSun,
        ...(existingPlanetId ? { _id: { $ne: existingPlanetId } } : {})
    });
    if(existing) {
        return {valid: false, error: `Planet ${existing.name} with orderFromSun ${orderFromSun} already exists.`};
    }

    return { valid: true, data: {name, orderFromSun, hasRings}};
}


function isValidId(id) {
    if (
        (typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(id)) ||  // 24-char hex string
        (id instanceof Uint8Array && id.length === 12) ||           // 12-byte Uint8Array
        (Number.isInteger(id))                                      // Integer
    ) {
        return true;
    }
    return false;
}

module.exports = router;