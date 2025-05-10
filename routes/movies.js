const express = require('express');
const router = express.Router();
const Movies = require('../models/Movies');

// Route Definitions
router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', addMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);
router.delete('/', clearAllMovies);

// Handlers
async function getAllMovies(req, res) {
    try {
        const movies = await Movies.find();
        res.json({ success: true, data: movies });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error fetching movies' });
    }
}

async function getMovieById(req, res) {
    const id = req.params.id;
    if (!isValidId(id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID' });
    }

    try {
        const movie = await Movies.findById(id);
        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }
        res.json({ success: true, data: movie });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error getting movie' });
    }
}

async function addMovie(req, res) {
    try {
        const newMovie = await Movies.create(req.body);
        res.status(201).json({ success: true, data: newMovie });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error saving movie' });
    }
}

async function updateMovie(req, res) {
    const id = req.params.id;
    if (!isValidId(id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID' });
    }

    try {
        const updated = await Movies.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }
        res.json({ success: true, data: updated });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error updating movie' });
    }
}

async function deleteMovie(req, res) {
    const id = req.params.id;
    if (!isValidId(id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID' });
    }

    try {
        const deleted = await Movies.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }
        res.json({ success: true, message: 'Movie deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error deleting movie' });
    }
}

async function clearAllMovies(req, res) {
    try {
        await Movies.deleteMany({});
        res.json({ success: true, message: 'All movies deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error clearing movies' });
    }
}

// ID validator (same as planets)
function isValidId(id) {
    return (
        (typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(id)) ||
        (id instanceof Uint8Array && id.length === 12) ||
        (Number.isInteger(id))
    );
}

module.exports = router;
