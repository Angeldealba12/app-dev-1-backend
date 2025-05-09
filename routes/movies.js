const express = require('express');
const router = express.Router();
const Movies = require('../models/Movies');

// GET all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movies.find();
        res.json({ success: true, data: movies });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching movies' });
    }
});

// POST new movie
router.post('/', async (req, res) => {
    try {
        const newMovie = await Movies.create(req.body);
        res.status(201).json({ success: true, data: newMovie });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error saving movie' });
    }
});

// PUT update movie
router.put('/:id', async (req, res) => {
    try {
        const updated = await Movies.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, data: updated });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error updating movie' });
    }
});

// DELETE one movie
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Movies.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, message: 'Movie deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error deleting movie' });
    }
});

// DELETE all
router.delete('/', async (req, res) => {
    try {
        await Movies.deleteMany({});
        res.json({ success: true, message: 'All movies deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error clearing movies' });
    }
});

module.exports = router;
