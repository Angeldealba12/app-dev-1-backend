// Application dependencies
const express = require('express');
const router = express.Router();
const Todos = require('../models/Todos');

let uniqueId = 1;
const todos = [
    {
        "userId": 1, // based-on user logged in
        "id": 1, // auto-incrementing value
        "title": "Brush my teeth",
        "completed": false
    }
];

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
function addTodo(req, res) {
    const title = req.body.title;
    const completed = false;
    const id = ++uniqueId; // Change to auto-incrementing value
    const userId = 1; // Change based on user logged in
    // Be careful of injection attacks
    if(title) {
        const todo = {
            "title": title,
            "completed": completed,
            "id": id,
            "userId": userId,
        }
        todos.push(todo);
        res.json({success: true, data: todo});
    } else {
        res.status(500).json({success: false});
    }
}

function updateSingleTodo(req, res) {
    const todo = todos.find((todo) => todo.id === +req.params.id); // + changes string to int
    if(!todo) {
        res.status(404).send("Not Found");
    }
    todo.title = req.body.title;
    todo.completed = !!req.body.completed; // Converts string to boolean
    res.json({success: true});
}

function deleteSingleTodo(req, res) {
    const todo = todos.find((todo) => todo.id === +req.params.id); // + changes string to int
    if(!todo) {
        res.status(404).send("Not Found");
    }
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
    res.json({success: true});
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