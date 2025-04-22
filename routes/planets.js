// Application dependencies
const express = require('express');
const router = express.Router();
const Planets = require('../models/Planets');
const Todos = require("../models/Todos");

router.get('/', getPlanets);
router.get('/:id', getSinglePlanet);
router.post('/', addPlanet);
router.put('/:id', updateSinglePlanet);
router.delete('/:id', deleteSinglePlanet);



async function getPlanets (req, res) {
    try {
        const planets = await Planets.find();
        res.json({ success: true, data: planets });
    } catch(error) {
        console.log(error);
        res.status(500).json({success: false, message: 'Something went wrong!'});
    }
}

// Get a single planet
async function getSinglePlanet(req, res) {
    const id = req.params.id;

    if (!isValidId(id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }
    const planet = await Planets.findById(id);
    if(!planet) {
        return res.status(404).json({success: false, message: 'Not found!'});
    }
    res.json({ success: true, data: planet});
}



async function addPlanet(req, res) {
    const name = req.body.name;
    const orderFromSun = 1;
    const hasRings = false;

    if(name) {
        const planet = new Planets({
            "name": name,
            "orderFromSun": orderFromSun,
            "hasRings": hasRings,
        });
        const savedPlanet = await planet.save()
        res.json({success: true, data: savedPlanet});
    } else {
        res.status(400).json({ success: false, message: 'Name is required' });
    }
}

async function updateSinglePlanet(req, res) {
    const id = req.params.id;
    if (!isValidId(id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }
    let planet = {};
    planet.name = req.body.name;
    planet.orderFromSun = !!req.body.orderFromSun;
    const updatedPlanet = await Planets.findByIdAndUpdate(id, {$set: planet}, {new: true});
    if(!updatedPlanet) {
        return res.status(404).json({success: false, message: 'Not found!'});
    }
    res.json({success: true, data: updatedPlanet});
}

async function deleteSinglePlanet(req, res) {
    const id = req.params.id;
    try {
        const deletedPlanet = await Planets.findByIdAndDelete(id);
        if (!deletedPlanet) {
            return res.status(404).json({ success: false, message: 'Planet not found' });
        }
        res.json({ success: true, message: 'Planet deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
}


function isValidId(id) {
    return (typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(id)) ||  // 24-char hex string
        (id instanceof Uint8Array && id.length === 12) ||           // 12-byte Uint8Array
        (Number.isInteger(id));

}

module.exports = router;