// Application dependencies
const express = require('express');
const router = express.Router();
const Todos = require('../models/Todos');

// route definitions
// Get all todos
router.get('/', getTodos);
// Get a single to-do
router.get('/:id', getSingleTodo);
// Add a new to-do
router.post('/', addTodo);
// Update a single to-do
router.put('/:id', updateSingleTodo);
// Delete a single to-do
router.delete('/:id', deleteSingleTodo);


// Route handlers
async function getTodos (req, res) {
    try {
        const todos = await Todos.find();
        res.json({ success: true, data: todos});
    } catch(error) {
        console.log(error);
        res.status(500).json({success: false, message: 'Something went wrong!'});
    }
}
async function getSingleTodo(req, res) {
    const id = req.params.id;
    if (!isValidId(id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }
    const todo = await Todos.findById(id);
    if(!todo) {
        return res.status(404).json({success: false, message: 'Not found!'});
    }
    res.json({ success: true, data: todo});
}


async function addTodo(req, res) {
    const { title } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({ success: false, message: "Title is required." });
    }

    try {
        const newTodo = await Todos.create({
            title: title.trim(),
            userId: 1,
            completed: false
        });

        res.status(201).json({ success: true, data: newTodo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to create todo." });
    }
}


async function updateSingleTodo(req, res) {
    const id = req.params.id;
    if (!isValidId(id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }
    todo = {};
    todo.title = req.body.title;
    todo.completed = !!req.body.completed; // Converts string to boolean
    const updatedTodo = await Todos.findByIdAndUpdate(id, {$set: todo}, {new: true});
    if(!updatedTodo) {
        return res.status(404).json({success: false, message: 'Not found!'});
    }
    res.json({success: true, data: updatedTodo});

}

async function deleteSingleTodo(req, res) {
    const id = req.params.id;

    if (!isValidId(id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }

    try {
        const deletedTodo = await Todos.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ success: false, message: 'Todo not found' });
        }
        res.json({ success: true, message: 'Todo deleted' });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ success: false, message: 'Failed to delete todo' });
    }
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