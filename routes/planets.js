// Application dependencies
const express = require('express');
const router = express.Router();
const Planets = require('../models/Planets.js');

// Route definitions
router.get('/', getPlanets);
router.post('/', addPlanet);
router.put('/:id', updatePlanet);
router.delete('/:id', deletePlanet);
router.delete('/', clearAllPlanets);
router.get('/:id', getPlanetById);

// Route handlers
async function getPlanets(req, res) {
    try {
        const planets = await Planets.find();
        res.json({ success: true, data: planets });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
}

async function addPlanet(req, res) {
    const { name, orderFromSun, hasRings } = req.body;

    if (!name || typeof orderFromSun !== 'number' || typeof hasRings !== 'boolean') {
        return res.status(400).json({ success: false, message: "Invalid input" });
    }

    try {
        const newPlanet = new Planets({ name, orderFromSun, hasRings });
        const savedPlanet = await newPlanet.save();
        res.status(201).json({ success: true, data: savedPlanet });
    } catch (error) {
        console.error("Error saving planet:", error);
        res.status(500).json({ success: false, message: "Error saving planet to database" });
    }
}

async function updatePlanet(req, res) {
    const id = req.params.id;
    if (!isValidId(id)) {
        return res.status(400).json({ success: false, message: 'Invalid id or not valid' });
    }

    try {
        const result = await validatePlanetInput(req.body, id);

        if (!result.valid) {
            return res.status(400).json({ success: false, message: result.error });
        }

        const updatedPlanet = await Planets.findByIdAndUpdate(id, { $set: result.data }, { new: true });
        if (!updatedPlanet) {
            return res.status(404).json({ success: false, message: 'Planet not found' });
        }

        res.json({ success: true, data: updatedPlanet });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Unknown error occurred" });
    }
}

async function deletePlanet(req, res) {
    const id = req.params.id;

    if (!isValidId(id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID' });
    }

    try {
        const deleted = await Planets.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Planet not found' });
        }
        res.json({ success: true, message: 'Planet deleted' });
    } catch (error) {
        console.error("Error deleting planet:", error);
        res.status(500).json({ success: false, message: 'Error deleting planet' });
    }
}

async function clearAllPlanets(req, res) {
    try {
        await Planets.deleteMany({});
        res.json({ success: true, message: 'All planets deleted' });
    } catch (err) {
        console.error("Error clearing planets:", err);
        res.status(500).json({ success: false, message: 'Failed to clear planets' });
    }
}

async function getPlanetById(req, res) {
    const id = req.params.id;

    if (!isValidId(id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }

    try {
        const planet = await Planets.findById(id);
        if (!planet) {
            return res.status(404).json({ success: false, message: 'Planet not found' });
        }

        res.json({ success: true, data: planet });
    } catch (error) {
        console.error("Error fetching planet:", error);
        res.status(500).json({ success: false, message: 'Failed to retrieve planet' });
    }
}


// Validation
async function validatePlanetInput(input, existingPlanetId = null) {
    let { name, orderFromSun, hasRings } = input;

    name = (typeof name === 'string') ? name.trim() : '';

    if (!name) {
        return { valid: false, error: 'Please enter a valid name.' };
    }

    if (!Number.isInteger(orderFromSun) || orderFromSun <= 0) {
        return { valid: false, error: 'orderFromSun must be a number greater than 0.' };
    }

    const existing = await Planets.findOne({
        orderFromSun,
        ...(existingPlanetId ? { _id: { $ne: existingPlanetId } } : {})
    });
    if (existing) {
        return {
            valid: false,
            error: `Planet ${existing.name} with orderFromSun ${orderFromSun} already exists.`
        };
    }

    if (hasRings === null || hasRings === undefined) {
        hasRings = false;
    }
    if (typeof hasRings === 'string') {
        hasRings = hasRings.trim().toLowerCase() === 'true';
    }

    return { valid: true, data: { name, orderFromSun, hasRings } };
}

// Validate MongoDB ObjectId format
function isValidId(id) {
    return (
        (typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(id)) ||
        (id instanceof Uint8Array && id.length === 12) ||
        (Number.isInteger(id))
    );
}

module.exports = router;
