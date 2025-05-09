// Application dependencies
const express = require('express');
const router = express.Router();
const Planets = require('../models/Planets.js');
const Todos = require("../models/Todos");

// route definitions
router.get('/', getPlanets);
router.post('/', addPlanet);
router.put('/:id', updatePlanet);

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
    try {
        const result = await validatePlanetInput(req.body);

        // Validate user input before continuing
        if (!result.valid) {
            return res.status(400).json({success: false, message: result.error});
        }

        const planet = new Planets(result.data);
        const savedPlanet = await planet.save();
        res.json({success: true, data: savedPlanet});
    } catch(error) {
        console.error(error);
        return res.status(500).json({success: false, error: "Unknown error occurred"});
    }
}

async function updatePlanet (req, res) {
    const id = req.params.id;
    if(!isValidId(id)) {
        return res.status(400).json({success: false, message: 'Invalid id or not valid'});
    }
    try {
        const result = await validatePlanetInput(req.body, id);

        // Validate user input before continuing
        if (!result.valid) {
            return res.status(400).json({success: false, message: result.error});
        }

        const updatedPlanet = await Planets.findByIdAndUpdate(id, {$set: result.data}, {new: true});
        console.log(updatedPlanet);
        if (!updatedPlanet) {
            return res.status(404).json({success: false, message: 'Planet not found'});
        }
        res.json({success: true, data: updatedPlanet});
    } catch(error) {
        console.error(error);
        return res.status(500).json({success: false, error: "Unknown error occurred"});
    }
}

async function validatePlanetInput(input, existingPlanetId = null) {
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

    // Validate hasRings
    if(hasRings === null) {
        hasRings = false;
    }
    if(typeof hasRings === 'string') {
        hasRings = hasRings.trim().toLowerCase() === 'true';
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