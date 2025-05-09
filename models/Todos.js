const mongoose = require('mongoose');
const conn = mongoose.createConnection(process.env.MONGODB_URI_TODOS);

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    userId: Number,
    completed: Boolean
});

module.exports = conn.model('Todos', todoSchema);
